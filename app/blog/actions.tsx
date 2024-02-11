"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  console.log({ title, content });
  if (!title || !content) return;
  const response = await prisma.blogEntry.create({
    data: {
      title,
      content,
    },
  });
  revalidatePath("/blog");
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
  const prompt = formData.get("prompt") as string;
  if (!prompt) return;
  const response = await prisma.userPrompts.create({
    data: {
      prompt,
      selected: false,
      userId: "cloq0dqng0003tu2ku9ad3p7t",
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
