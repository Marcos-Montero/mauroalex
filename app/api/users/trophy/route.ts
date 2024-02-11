import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();
  const user = await prisma.userTrophies.create({
    data: {
      userId: data.userId,
      trophyId: data.trophyId,
    },
  });
  return NextResponse.json(user);
}
export async function DELETE(req: Request) {
  const data = await req.json();
  const user = await prisma.userTrophies.deleteMany({
    where: {
      userId: data.userId,
      trophyId: data.trophyId,
    },
  });
  return NextResponse.json(user);
}
