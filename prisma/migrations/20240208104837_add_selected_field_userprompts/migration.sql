/*
  Warnings:

  - Added the required column `selected` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPrompts" ADD COLUMN     "selected" BOOLEAN NOT NULL;
