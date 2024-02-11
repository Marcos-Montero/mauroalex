import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  const session = await getSession();
  const currentUserEmail = session?.user?.email!;
  const data = await req.json();
  const record = await prisma.user.update({
    where: { email: currentUserEmail },
    data: {
      nickname: data.nickname,
      age: parseInt(data.age),
      weight: parseFloat(data.weight),
      goalWeight: parseFloat(data.goalWeight),
    },
  });

  return NextResponse.json(record);
}
export async function DELETE(req: Request) {
  const data = await req.json();
  const record = await prisma.user.delete({
    where: { id: data.id },
  });

  return NextResponse.json(record);
}
