import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const pdfs = await prisma.pdf.findMany({
    where: { userId: user.id },
    select: { id: true, fileName: true },
  });
  return Response.json(pdfs);
}