-- DropForeignKey
ALTER TABLE "Task_Order" DROP CONSTRAINT "Task_Order_column_id_fkey";

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "task_order_id" TEXT;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_task_order_id_fkey" FOREIGN KEY ("task_order_id") REFERENCES "Task_Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
