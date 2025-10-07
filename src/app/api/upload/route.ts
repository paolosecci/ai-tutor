import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import PDFParser from 'pdf2json';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    i = end;
  }
  return chunks;
}

export async function POST(req: Request) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log('Unauthorized', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      console.log('User not found', session.user.email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate file
    const formData = await req.formData();
    const file = formData.get('pdf') as File | null;
    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      console.log('Invalid file type', file.name);
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Save file
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${user.id}-${Date.now()}-${file.name}`);
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));

    // Create PDF record
    const pdfRecord = await prisma.pdf.create({
      data: {
        userId: user.id,
        fileName: file.name,
        filePath: `/uploads/${path.basename(filePath)}`,
      },
    });

    // Extract text with pdf2json
    let text = '';
    try {
      const pdfParser = new PDFParser();
      const buffer = Buffer.from(arrayBuffer);
      text = await new Promise<string>((resolve, reject) => {
        pdfParser.on('pdfParser_dataError', (errData: any) => reject(new Error(errData.parserError)));
        pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
          const extractedText = pdfData.Pages.flatMap((page: any) =>
            page.Texts.map((text: any) => decodeURIComponent(text.R[0].T))
          ).join(' ');
          resolve(extractedText);
        });
        pdfParser.parseBuffer(buffer);
      });
      console.log('PDF text extracted', { pdfId: pdfRecord.id, textLength: text.length });
    } catch (error) {
      console.error('PDF parsing error', error);
      return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
    }

    // Split into chunks
    const chunks = splitIntoChunks(text, 1200);
    if (chunks.length === 0) {
      console.log('No text extracted from PDF', pdfRecord.id);
      return NextResponse.json({ pdfRecord }, { status: 200 });
    }

    // Generate and store embeddings
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
            embedding: embedding,
          },
        });

        globalOffset += chunk.length + 1;
      } catch (error) {
        console.error('Embedding creation error for chunk', { page: i + 1, error });
        return NextResponse.json({ error: 'Failed to generate embeddings' }, { status: 500 });
      }
    }

    console.log('PDF processed successfully', { pdfId: pdfRecord.id, chunkCount: chunks.length });
    return NextResponse.json(pdfRecord);
  } catch (error) {
    console.error('Upload API error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}