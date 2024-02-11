/*
  Warnings:

  - You are about to drop the column `mark` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `mark` on the `RankingEntry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_rankingId_fkey";

-- DropForeignKey
ALTER TABLE "RankingEntry" DROP CONSTRAINT "RankingEntry_rankingId_fkey";

-- DropForeignKey
ALTER TABLE "RankingEntry" DROP CONSTRAINT "RankingEntry_userId_fkey";

-- DropIndex
DROP INDEX "RankingEntry_rankingId_userId_key";

-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "mark";

-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "RankingEntry" DROP COLUMN "mark";

-- DropEnum
DROP TYPE "Order";

-- CreateTable
CREATE TABLE "RankingEntryValue" (
    "id" TEXT NOT NULL,
    "rankingEntryId" TEXT NOT NULL,
    "measureId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RankingEntryValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntry" ADD CONSTRAINT "RankingEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntry" ADD CONSTRAINT "RankingEntry_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntryValue" ADD CONSTRAINT "RankingEntryValue_rankingEntryId_fkey" FOREIGN KEY ("rankingEntryId") REFERENCES "RankingEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntryValue" ADD CONSTRAINT "RankingEntryValue_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "Measure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
