-- CreateTable
CREATE TABLE "Trophy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Trophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTrophies" (
    "userId" TEXT NOT NULL,
    "trophyId" TEXT NOT NULL,

    CONSTRAINT "UserTrophies_pkey" PRIMARY KEY ("userId","trophyId")
);

-- AddForeignKey
ALTER TABLE "UserTrophies" ADD CONSTRAINT "UserTrophies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrophies" ADD CONSTRAINT "UserTrophies_trophyId_fkey" FOREIGN KEY ("trophyId") REFERENCES "Trophy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
