/*
  Warnings:

  - You are about to drop the column `codigo` on the `Entrada` table. All the data in the column will be lost.
  - The required column `codigo` was added to the `DetalleFactura` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "DetalleFactura" ADD COLUMN     "codigo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Entrada" DROP COLUMN "codigo";
