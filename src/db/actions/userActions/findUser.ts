'use server';
import prisma from '@/../prisma/db';

export async function findUser() {
  const user = await prisma.user.findFirst();
  return user;
}
