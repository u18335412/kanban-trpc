/*
  Warnings:

  - You are about to drop the column `task_order` on the `column` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `column` DROP COLUMN `task_order`,
    ADD COLUMN `taskOrder` JSON NULL;
