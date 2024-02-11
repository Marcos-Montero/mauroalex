-- CreateTable
CREATE TABLE "UserPrompts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "UserPrompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPrompts" ADD CONSTRAINT "UserPrompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
