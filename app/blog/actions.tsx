"use server";

import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const createBlog = async ({
  title,
  content,
}: {
  title?: string;
  content?: string;
}) => {
  if (!title || !content) return;
  const response = await prisma.blogEntry.create({
    data: {
      title,
      content,
    },
  });
  revalidatePath("/");
  return response;
};
export const selectPrompt = async (formData: FormData) => {
  const promptId = formData.get("promptId") as string;
  if (!promptId) return;
  await prisma.userPrompts.updateMany({
    data: { selected: false },
  });
  const response = await prisma.userPrompts.update({
    where: { id: promptId },
    data: { selected: true },
  });
  revalidatePath("/blog/new");

  return response;
};
export const createPrompt = async (formData: FormData) => {
  const session = await getSession();
  const userId = session?.user?.id;
  const prompt = formData.get("prompt") as string;
  if (!prompt || !userId) return;
  const response = await prisma.userPrompts.create({
    data: {
      prompt,
      selected: false,
      userId,
    },
  });
  revalidatePath("/blog/new");
  return response;
};
export const deletePrompt = async (formData: FormData) => {
  const promptId = formData.get("promptId") as string;
  console.log({ promptId });
  if (!promptId) return;
  const response = await prisma.userPrompts.delete({
    where: { id: promptId },
  });
  revalidatePath("/blog/new");
  return response;
};
