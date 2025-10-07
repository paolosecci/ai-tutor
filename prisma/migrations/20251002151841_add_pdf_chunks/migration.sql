-- CreateTable
CREATE TABLE "PdfChunk" (
    "id" TEXT NOT NULL,
    "pdfId" TEXT NOT NULL,
    "page" INTEGER,
    "start" INTEGER,
    "end" INTEGER,
    "text" TEXT NOT NULL,
    "embedding" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfChunk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PdfChunk_pdfId_idx" ON "PdfChunk"("pdfId");

-- AddForeignKey
ALTER TABLE "PdfChunk" ADD CONSTRAINT "PdfChunk_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "Pdf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
