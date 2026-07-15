/*
  Warnings:

  - You are about to drop the column `diplayName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "diplayName",
ADD COLUMN     "name" TEXT;
