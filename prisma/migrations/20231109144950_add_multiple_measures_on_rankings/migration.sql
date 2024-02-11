/*
  Warnings:

  - You are about to drop the column `measure` on the `Ranking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "measure";

-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,
    "rankingId" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
