import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
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
// Background: extract text + create embeddings
// ---------------------------
async function processPdfInBackground(pdfRecord: any, arrayBuffer: ArrayBuffer) {
  console.log(`Starting background processing for PDF ${pdfRecord.id}`);

  try {
    const pdfParser = new PDFParser();
    const buffer = Buffer.from(arrayBuffer);

    const text = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: any) =>
        reject(new Error(errData.parserError))
      );
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        const extractedText = pdfData.Pages.flatMap((page: any) =>
          page.Texts.map((t: any) => decodeURIComponent(t.R[0].T))
        ).join(' ');
        resolve(extractedText);
      });
      pdfParser.parseBuffer(buffer);
    });

    console.log(`PDF text extracted (${text.length} chars)`);

    const chunks = splitIntoChunks(text, 1200);
    if (chunks.length === 0) {
      console.log('No text extracted, skipping embeddings.');
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

        await prisma.pdfChunk.create({
          data: {
            pdfId: pdfRecord.id,
            page: i + 1,
            start,
            end,
            text: chunk,
            embedding: emb.data[0].embedding,
          },
        });

        globalOffset += chunk.length + 1; // +1 for the space/newline we "lost"
      } catch (error) {
        console.error(`Embedding error for chunk ${i + 1}:`, error);
      }
    }

    console.log(`PDF ${pdfRecord.id} processed successfully with ${chunks.length} chunks`);
  } catch (error) {
    console.error(`Background PDF processing failed for ${pdfRecord.id}:`, error);
  }
}

// ---------------------------
// MAIN UPLOAD ENDPOINT
// ---------------------------
export async function POST(req: Request) {
  try {
    // Auth
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

    // Get file
    const formData = await req.formData();
    const file = formData.get('pdf') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Read buffer once (needed for background processing)
    const arrayBuffer = await file.arrayBuffer();

    // Upload to Vercel Blob (your store name is already linked via BLOB_READ_WRITE_TOKEN)
    const { url } = await put(`pdfs/${user.id}-${Date.now()}-${file.name}`, file.stream(), {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN, // explicit = bulletproof
    });

    // Create DB records
    const pdfRecord = await prisma.pdf.create({
      data: {
        userId: user.id,
        fileName: file.name,
        filePath: url, // public URL
      },
    });

    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
        pdfId: pdfRecord.id,
      },
    });

    // Fire-and-forget background embedding job
    setTimeout(() => {
      processPdfInBackground(pdfRecord, arrayBuffer).catch(console.error);
    }, 100);

    // Immediate response so user gets redirected fast
    return NextResponse.json({ id: chat.id });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}