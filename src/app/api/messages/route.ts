import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) return new Response('User not found', { status: 404 });

  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatId');
  if (!chatId) return new Response('chatId required', { status: 400 });

  const chat = await prisma.chat.findFirst({ where: { id: chatId, userId: user.id } });
  if (!chat) return new Response('Forbidden', { status: 403 });

  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { timestamp: 'asc' },
    select: { id: true, role: true, content: true }
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response('Unauthorized', { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) return new Response('User not found', { status: 404 });

  const { chatId, role, content } = await req.json();
  if (!chatId || !role || !content) return new Response('Bad request', { status: 400 });

  const chat = await prisma.chat.findFirst({ where: { id: chatId, userId: user.id } });
  if (!chat) return new Response('Forbidden', { status: 403 });

  const message = await prisma.message.create({
    data: { chatId, role, content }
  });

  return NextResponse.json(message);
}