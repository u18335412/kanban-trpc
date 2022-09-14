-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_column_id_fkey";

-- DropForeignKey
ALTER TABLE "Task_Order" DROP CONSTRAINT "Task_Order_column_id_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Order" ADD CONSTRAINT "Task_Order_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
