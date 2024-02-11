-- CreateTable
CREATE TABLE "UserBlogEntry" (
    "userId" TEXT NOT NULL,
    "blogEntryId" TEXT NOT NULL,

    CONSTRAINT "UserBlogEntry_pkey" PRIMARY KEY ("userId","blogEntryId")
);

-- AddForeignKey
ALTER TABLE "UserBlogEntry" ADD CONSTRAINT "UserBlogEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlogEntry" ADD CONSTRAINT "UserBlogEntry_blogEntryId_fkey" FOREIGN KEY ("blogEntryId") REFERENCES "BlogEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
