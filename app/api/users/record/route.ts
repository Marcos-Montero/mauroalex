import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { Record } from "@prisma/client";

export async function POST(req: Request) {
  const data = await req.json();

  const record = await prisma.record.create({
    data: {
      mark: data.mark,
      userId: data.userId,
      timestamp: new Date(data.date),
      basicExerciseId: data.basicExerciseId,
    },
  });
  return NextResponse.json(record);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const deleteMany = await prisma.record.deleteMany({
    where: {
      userId: data.userId,
      basicExerciseId: data.basicExerciseId,
    },
  });
  const record = await prisma.record.createMany({
    data: data.records.map(({ mark, timestamp }: Record) => ({
      mark,
      timestamp,
      userId: data.userId,
      basicExerciseId: data.basicExerciseId,
    })),
  });
  return NextResponse.json({ record, deleteMany });
}
