/*
  Warnings:

  - The required column `codigo` was added to the `Entrada` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "codigo" TEXT NOT NULL;
