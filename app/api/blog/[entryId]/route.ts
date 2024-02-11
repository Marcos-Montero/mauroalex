import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { entryId } = request.query;
  if (!entryId || Array.isArray(entryId)) {
    response.status(400).json({ error: "No entryId provided" });
    return;
  }
  const blogEntry = await prisma.blogEntry.findUnique({
    where: {
      id: entryId,
    },
  });
  response.status(200).json(blogEntry);
}
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { entryId } = req.query;
  if (!entryId || Array.isArray(entryId)) {
    res.status(400).json({ error: "No entryId provided" });
    return;
  }
  const data = await req.body;
  const record = await prisma.blogEntry.update({
    where: {
      id: entryId,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });
  res.status(200).json(record);
}
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { entryId } = req.query;
  if (!entryId || Array.isArray(entryId)) {
    res.status(400).json({ error: "No entryId provided" });
    return;
  }
  const record = await prisma.blogEntry.delete({
    where: {
      id: entryId,
    },
  });
  res.status(200).json(record);
}
