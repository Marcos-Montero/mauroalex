import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const users = await prisma.blogEntry.findMany();
  return NextResponse.json(users);
}
export async function POST(req: Request) {
  const data = await req.json();
  const record = await prisma.blogEntry.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });
  return NextResponse.json(record);
}
