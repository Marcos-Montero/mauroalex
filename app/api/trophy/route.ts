import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();
  const torphy = await prisma.trophy.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return NextResponse.json(torphy);
}
export async function DELETE(req: Request) {
  const data = await req.json();
  const record = await prisma.trophy.delete({
    where: { id: data.id },
  });
  return NextResponse.json(record);
}
