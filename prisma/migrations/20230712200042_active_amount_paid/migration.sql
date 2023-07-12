/*
  Warnings:

  - Added the required column `amountPaid` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "amountPaid" INTEGER NOT NULL;
