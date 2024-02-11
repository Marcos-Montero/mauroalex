-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_rankingId_fkey";

-- DropForeignKey
ALTER TABLE "RankingEntry" DROP CONSTRAINT "RankingEntry_rankingId_fkey";

-- DropForeignKey
ALTER TABLE "RankingEntry" DROP CONSTRAINT "RankingEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "RankingEntryValue" DROP CONSTRAINT "RankingEntryValue_measureId_fkey";

-- DropForeignKey
ALTER TABLE "RankingEntryValue" DROP CONSTRAINT "RankingEntryValue_rankingEntryId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntry" ADD CONSTRAINT "RankingEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntry" ADD CONSTRAINT "RankingEntry_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntryValue" ADD CONSTRAINT "RankingEntryValue_rankingEntryId_fkey" FOREIGN KEY ("rankingEntryId") REFERENCES "RankingEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingEntryValue" ADD CONSTRAINT "RankingEntryValue_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "Measure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
