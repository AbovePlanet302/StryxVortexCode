/*
  Warnings:

  - Added the required column `reason` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cases" ADD COLUMN     "reason" TEXT NOT NULL;
