/*
  Warnings:

  - Added the required column `months` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "months" INTEGER NOT NULL;
