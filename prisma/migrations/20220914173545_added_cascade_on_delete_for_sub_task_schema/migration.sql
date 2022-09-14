-- DropForeignKey
ALTER TABLE "Sub_Task" DROP CONSTRAINT "Sub_Task_task_id_fkey";

-- CreateTable
CREATE TABLE "Task_Order" (
    "id" TEXT NOT NULL,
    "column_id" TEXT NOT NULL,
    "order" JSONB NOT NULL,

    CONSTRAINT "Task_Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sub_Task" ADD CONSTRAINT "Sub_Task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Order" ADD CONSTRAINT "Task_Order_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
