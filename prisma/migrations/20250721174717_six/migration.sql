/*
  Warnings:

  - You are about to drop the column `resetPasswordExpiredAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordExpiredAt",
ADD COLUMN     "resetPasswordTokenExpiredAt" TIMESTAMP(3);
