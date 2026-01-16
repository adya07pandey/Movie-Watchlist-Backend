/*
  Warnings:

  - You are about to drop the column `rating` on the `WatchlistItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "rating",
ADD COLUMN     "runtime" INTEGER;
