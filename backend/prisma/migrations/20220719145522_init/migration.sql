/*
  Warnings:

  - You are about to drop the column `codigo` on the `DetalleFactura` table. All the data in the column will be lost.
  - The primary key for the `Registro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Registro` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The required column `codigo` was added to the `Entrada` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idlugar` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleFactura" DROP COLUMN "codigo";

-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "codigo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Registro" DROP CONSTRAINT "Registro_pkey",
ADD COLUMN     "idlugar" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Registro_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "rolId" SET DEFAULT 3;
