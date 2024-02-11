/*
  Warnings:

  - A unique constraint covering the columns `[rankingId,userId]` on the table `RankingEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RankingEntry_userId_rankingId_key";

-- CreateIndex
CREATE UNIQUE INDEX "RankingEntry_rankingId_userId_key" ON "RankingEntry"("rankingId", "userId");
