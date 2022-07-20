/*
  Warnings:

  - The primary key for the `Registro` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Registro" DROP CONSTRAINT "Registro_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Registro_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Registro_id_seq";
