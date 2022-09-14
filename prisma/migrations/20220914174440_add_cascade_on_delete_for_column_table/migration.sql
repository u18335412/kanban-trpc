-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_board_id_fkey";

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
