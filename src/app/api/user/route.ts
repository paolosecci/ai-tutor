import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
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

  return Response.json(user);
}