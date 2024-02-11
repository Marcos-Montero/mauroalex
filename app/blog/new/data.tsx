import { unstable_noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export const getBlogEntries = async () => {
  unstable_noStore();
  const blogEntries = await prisma.blogEntry.findMany();
  return blogEntries;
};
export const getUserPrompts = async () => {
  unstable_noStore();
  const users = await prisma.userPrompts.findMany();

  return users;
};
