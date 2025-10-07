import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: Request, { params }: { params: Promise<{ pdfId: string }> }) {
  const { pdfId } = await params;

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

  const pdf = await prisma.pdf.findFirst({
    where: { id: pdfId, userId: user.id },
  });
  if (!pdf) return Response.json({ error: 'PDF not found' }, { status: 404 });

  return Response.json(pdf);
}