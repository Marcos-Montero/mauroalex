import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const GET = async (request: Request) => {
  return NextResponse.json(await prisma.rankingEntry.findMany());
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const { measures, rankingId } = data;
  const session = await getSession();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const rankingEntry = await prisma.$transaction(async (prisma) => {
    // Attempt to find the existing RankingEntry
    const existingEntry = await prisma.rankingEntry.findUnique({
      where: {
        rankingId_userId: {
          userId: user?.id!,
          rankingId: rankingId,
        },
      },
    });

    if (existingEntry) {
      // If the RankingEntry exists, delete the old values
      await prisma.rankingEntryValue.deleteMany({
        where: { rankingEntryId: existingEntry.id },
      });
      // Update the RankingEntry and create new values
      return prisma.rankingEntry.update({
        where: { id: existingEntry.id },
        data: {
          values: {
            createMany: {
              data: measures.map((measure: any) => ({
                value: measure.value,
                measureId: measure.id,
              })),
            },
          },
        },
        include: {
          values: true,
        },
      });
    } else {
      // If the RankingEntry does not exist, create a new one with values
      return prisma.rankingEntry.create({
        data: {
          userId: user?.id!,
          rankingId: rankingId,
          values: {
            createMany: {
              data: measures.map((measure: any) => ({
                value: measure.value,
                measureId: measure.id,
              })),
            },
          },
        },
        include: {
          values: true,
        },
      });
    }
  });
  return NextResponse.json(rankingEntry);
};
