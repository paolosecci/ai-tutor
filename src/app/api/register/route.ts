import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashedPassword } });
    return Response.json(user, { status: 201 });
  } catch (e) {
    return Response.json({ error: 'User exists' }, { status: 400 });
  }
}