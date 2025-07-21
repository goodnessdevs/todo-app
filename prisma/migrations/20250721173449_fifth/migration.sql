-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpiredAt" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
