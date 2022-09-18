/*
  Warnings:

  - The `task_order` column on the `Column` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Column" DROP COLUMN "task_order",
ADD COLUMN     "task_order" JSONB;
