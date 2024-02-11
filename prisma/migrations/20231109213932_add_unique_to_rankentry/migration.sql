/*
  Warnings:

  - A unique constraint covering the columns `[userId,rankingId]` on the table `RankingEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RankingEntry_userId_rankingId_key" ON "RankingEntry"("userId", "rankingId");
