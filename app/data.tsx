import { prisma } from "@/lib/prisma";

export const getBlogEntries = async () => {
  const blogEntries = await prisma.blogEntry.findMany();
  return blogEntries;
};
