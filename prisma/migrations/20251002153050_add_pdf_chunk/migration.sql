/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PdfChunk` table. All the data in the column will be lost.
  - The `embedding` column on the `PdfChunk` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `page` on table `PdfChunk` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `PdfChunk` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end` on table `PdfChunk` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."PdfChunk_pdfId_idx";

-- AlterTable
ALTER TABLE "PdfChunk" DROP COLUMN "createdAt",
ALTER COLUMN "page" SET NOT NULL,
ALTER COLUMN "start" SET NOT NULL,
ALTER COLUMN "end" SET NOT NULL,
DROP COLUMN "embedding",
ADD COLUMN     "embedding" DOUBLE PRECISION[];
