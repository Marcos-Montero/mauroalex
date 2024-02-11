import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
export async function POST(req: Request) {
  const data = await req.json();
  const record = await prisma.ranking.create({
    data: {
      title: data.title,
      measures: {
        create: data.measures,
      },
    },
    include: {
      measures: true,
    },
  });
  return NextResponse.json(record);
}
export async function DELETE(req: Request) {
  const data = await req.json();
  const record = await prisma.ranking.delete({
    where: { id: data.id },
  });
  return NextResponse.json(record);
}
