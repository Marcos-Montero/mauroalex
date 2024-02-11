import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const data = await req.json();
  const record = await prisma.user.update({
    where: { id: data.id },
    data: {
      specialty: data.specialty,
    },
  });

  return NextResponse.json(record);
}
