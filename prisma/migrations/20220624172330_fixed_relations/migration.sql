/*
  Warnings:

  - You are about to drop the `Board_Column` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `board_id` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board_Column" DROP CONSTRAINT "Board_Column_board_id_fkey";

-- DropForeignKey
ALTER TABLE "Board_Column" DROP CONSTRAINT "Board_Column_column_id_fkey";

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "board_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Board_Column";

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
