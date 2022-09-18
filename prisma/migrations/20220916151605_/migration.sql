/*
  Warnings:

  - A unique constraint covering the columns `[column_id]` on the table `Task_Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_Order_column_id_key" ON "Task_Order"("column_id");
