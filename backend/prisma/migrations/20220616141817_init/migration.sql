/*
  Warnings:

  - Added the required column `espacio` to the `Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evento` to the `Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disponible` to the `Espacio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Espacio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "espacio" TEXT NOT NULL,
ADD COLUMN     "evento" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Espacio" ADD COLUMN     "disponible" INTEGER NOT NULL,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;
