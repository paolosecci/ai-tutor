import { streamText, convertToModelMessages } from 'ai';
import { openai as aiSdkOpenAI } from '@ai-sdk/openai';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const provider = aiSdkOpenAI('gpt-4.1-nano');

function cosine(a: number[], b: number[]) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-10);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 });
    }

    const payload = await req.json();
    const messages = payload?.messages;
    const pdfId = payload?.pdfId;

    if (!Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 });
    }

    if (!pdfId) {
      return new Response('PDF ID not found', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const pdf = await prisma.pdf.findFirst({
      where: { id: pdfId, userId: user.id },
    });
    if (!pdf && pdfId !== 'default') {
      return new Response('PDF not found', { status: 404 });
    }

    const chunks = await prisma.pdfChunk.findMany({ where: { pdfId } });

    if (!chunks.length) {
      const result = await streamText({
        model: provider,
        messages: convertToModelMessages(messages),
        system: `No text chunks found for PDF ${pdfId}. Ask the user to reupload or upload a different PDF.`,
      });
      return result.toUIMessageStreamResponse({
        originalMessages: messages,
        generateMessageId: () => Math.random().toString(36).slice(2),
      });
    }

    const lastUserMsg =
      messages?.slice(-1)[0]?.parts?.find((p: any) => p.type === 'text')?.text ?? '';

    const embResp = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: lastUserMsg,
    });
    const qEmb = embResp.data[0].embedding;

    const scored = chunks.map((c) => ({
      c,
      score: cosine(qEmb, c.embedding as number[]),
    }));
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 5).map((s) => s.c);

    const context = top.map((t) => `${t.text}`).join('\n\n');

    const systemPrompt = `
    You are an AI tutor. Use the following context from the PDF to answer clearly and concisely.
    Always respond with a JSON object of the following format:
    {
      "highlight": "<exact string to highlight in the PDF, or empty string if none>",
      "response": "<text to display to user in the chat>"
    }

    Context:
    ${context}
    `;

    const result = await streamText({
      model: provider,
      messages: convertToModelMessages(messages),
      system: systemPrompt,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      generateMessageId: () => Math.random().toString(36).slice(2),
    });
  } catch (err: any) {
    console.error('Chat API error', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}