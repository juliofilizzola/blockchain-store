-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "quantityToken" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "balance" SET DEFAULT 0;
