import { unstable_noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export const getArticleById = async (articleId: string) => {
  unstable_noStore();
  const article = await prisma.blogEntry.findUnique({
    where: {
      id: articleId,
    },
  });
  return article;
};
export const getBlogEntries = async () => {
  unstable_noStore();
  const blogEntries = await prisma.blogEntry.findMany();
  return blogEntries;
};
