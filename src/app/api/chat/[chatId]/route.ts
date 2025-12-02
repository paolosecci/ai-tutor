import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: { chatId: string } }
) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.chatId },
    select: { pdfId: true },
  });

  if (!chat) return NextResponse.json({}, { status: 404 });

  return NextResponse.json({ pdfId: chat.pdfId });
}