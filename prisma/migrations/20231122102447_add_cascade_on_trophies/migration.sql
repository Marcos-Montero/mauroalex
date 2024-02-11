-- DropForeignKey
ALTER TABLE "UserTrophies" DROP CONSTRAINT "UserTrophies_trophyId_fkey";

-- AddForeignKey
ALTER TABLE "UserTrophies" ADD CONSTRAINT "UserTrophies_trophyId_fkey" FOREIGN KEY ("trophyId") REFERENCES "Trophy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
