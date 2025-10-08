import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import PDFParser from 'pdf2json';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------------------------
// Helper: Split text into chunks
// ---------------------------
function splitIntoChunks(text: string, maxChars = 1200): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + maxChars, text.length);
    if (end < text.length) {
      const slice = text.slice(i, end);
      const lastBreak = Math.max(
        slice.lastIndexOf('.'),
        slice.lastIndexOf('\n'),
        slice.lastIndexOf(' ')
      );
      end = lastBreak > 100 ? i + lastBreak + 1 : end;
    }
    const chunk = text.slice(i, end).trim();
    if (chunk.length > 0) chunks.push(chunk);
    i = end;
  }
  return chunks;
}

// ---------------------------
// Background worker
// ---------------------------
async function processPdfInBackground(pdfRecord: any, arrayBuffer: ArrayBuffer) {
  console.log(`🚀 Starting background processing for PDF ${pdfRecord.id}`);

  try {
    // Parse PDF text
    const pdfParser = new PDFParser();
    const buffer = Buffer.from(arrayBuffer);
    const text = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: any) => reject(new Error(errData.parserError)));
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        const extractedText = pdfData.Pages.flatMap((page: any) =>
          page.Texts.map((t: any) => decodeURIComponent(t.R[0].T))
        ).join(' ');
        resolve(extractedText);
      });
      pdfParser.parseBuffer(buffer);
    });

    console.log(`📄 PDF text extracted (${text.length} chars)`);

    const chunks = splitIntoChunks(text, 1200);
    if (chunks.length === 0) {
      console.log('⚠️ No text extracted, skipping embeddings.');
      return;
    }

    let globalOffset = 0;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const start = globalOffset;
      const end = start + chunk.length;

      try {
        const emb = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk,
        });

        const embedding = emb.data[0].embedding;

        await prisma.pdfChunk.create({
          data: {
            pdfId: pdfRecord.id,
            page: i + 1,
            start,
            end,
            text: chunk,
            embedding,
          },
        });

        globalOffset += chunk.length + 1;
      } catch (error) {
        console.error(`❌ Embedding error for chunk ${i + 1}:`, error);
      }
    }

    console.log(`✅ PDF ${pdfRecord.id} processed successfully with ${chunks.length} chunks`);
  } catch (error) {
    console.error(`🔥 Background PDF processing failed for ${pdfRecord.id}:`, error);
  }
}

// ---------------------------
// Upload Endpoint
// ---------------------------
export async function POST(req: Request) {
  try {
    // Authenticate
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate file
    const formData = await req.formData();
    const file = formData.get('pdf') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Save file locally
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${user.id}-${Date.now()}-${file.name}`);
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));

    // Create PDF record in DB
    const pdfRecord = await prisma.pdf.create({
      data: {
        userId: user.id,
        fileName: file.name,
        filePath: `/uploads/${path.basename(filePath)}`,
      },
    });

    // ✅ Immediately return to frontend so it can redirect
    // (non-blocking background process starts after)
    setTimeout(() => {
      processPdfInBackground(pdfRecord, arrayBuffer)
        .catch((err) => console.error('Background processing failed:', err));
    }, 100); // small delay to ensure response is sent first

    return NextResponse.json({ id: pdfRecord.id });
  } catch (error) {
    console.error('❌ Upload API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}