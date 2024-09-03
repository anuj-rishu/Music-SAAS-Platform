/*
  Warnings:

  - You are about to drop the column `extarctedId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `smaillImg` on the `Stream` table. All the data in the column will be lost.
  - Added the required column `extractedId` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "extarctedId",
DROP COLUMN "smaillImg",
ADD COLUMN     "extractedId" TEXT NOT NULL,
ADD COLUMN     "smallImg" TEXT NOT NULL DEFAULT '';
