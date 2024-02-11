-- CreateTable
CREATE TABLE "ChallengeSet" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ChallengeSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "challengeSetId" TEXT NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeSet_userId_key" ON "ChallengeSet"("userId");

-- AddForeignKey
ALTER TABLE "ChallengeSet" ADD CONSTRAINT "ChallengeSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeSetId_fkey" FOREIGN KEY ("challengeSetId") REFERENCES "ChallengeSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
