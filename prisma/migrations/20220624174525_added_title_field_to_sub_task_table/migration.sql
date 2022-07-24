/*
  Warnings:

  - Added the required column `title` to the `Sub_Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sub_Task" ADD COLUMN     "title" TEXT NOT NULL;
