-- CreateTable
CREATE TABLE "BasicExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BasicExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mark" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "basicExerciseId" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_basicExerciseId_fkey" FOREIGN KEY ("basicExerciseId") REFERENCES "BasicExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
