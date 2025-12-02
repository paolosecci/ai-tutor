import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

// GET — returns list of chats for the ChatList component
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const chats = await prisma.chat.findMany({
    where: { userId: user.id },
    include: {
      pdf: {
        select: { fileName: true },
      },
      messages: {
        where: { role: 'user' },
        orderBy: { timestamp: 'asc' },
        take: 1,
        select: { content: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedChats = chats.map((chat) => {
    const firstUserMessage = chat.messages[0]?.content?.trim();

    let title: string;

    if (firstUserMessage) {
      title = firstUserMessage.length > 50
        ? firstUserMessage.slice(0, 47) + '...'
        : firstUserMessage;
    } else if (chat.pdf?.fileName) {
      title = chat.pdf.fileName.replace(/\.pdf$/i, '');
    } else {
      title = 'New Chat';
    }

    return {
      id: chat.id,
      title,
      date: chat.createdAt.toISOString().split('T')[0],
    };
  });

  return NextResponse.json(formattedChats);
}

// POST — creates a brand-new chat for a given pdfId (this is what was missing!)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pdfId } = await req.json();

  if (!pdfId) {
    return NextResponse.json({ error: 'pdfId is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const newChat = await prisma.chat.create({
    data: {
      userId: user.id,
      pdfId,
    },
  });

  return NextResponse.json({ id: newChat.id }, { status: 201 });
}