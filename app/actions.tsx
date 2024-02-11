"use server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const deleteArticle = async (articleId: string) => {
  const response = await prisma.blogEntry.delete({
    where: { id: articleId },
  });
  revalidatePath("/");
  return response;
};
