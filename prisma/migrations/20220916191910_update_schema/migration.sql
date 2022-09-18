/*
  Warnings:

  - You are about to drop the column `task_order_id` on the `Column` table. All the data in the column will be lost.
  - You are about to drop the `Task_Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_task_order_id_fkey";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "task_order_id",
ADD COLUMN     "task_order" JSONB;

-- DropTable
DROP TABLE "Task_Order";
