import { FC, useEffect, useState } from 'react';
import useAppStore from '~/data/useStore';
import { Board as BoardType, Column as ColumnType } from '@prisma/client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column, { ExtendedTask } from './Column';
import EmptyBoard from './EmptyBoard';
import { ModalType } from './ModalManager';
import { trpc } from '~/utils/trpc';

type ExtendedColumn = ColumnType & { task: ExtendedTask[] };

type ExtendedBoard = BoardType & {
  Column: ExtendedColumn[];
};
interface BoardProps {
  board: ExtendedBoard | undefined;
}

const reorderList = (
  list: string[],
  startIndex: number,
  endIndex: number,
): string[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed || '');

  return result;
};

const Board: FC<BoardProps> = ({ board }) => {
  const { selectedBoard, setSelectedModal, setViewTask } = useAppStore();
  const [columnOrderState, setColumnOrderState] = useState<string[]>([]);
  const [taskOrderState, setTaskOrderState] = useState<string[]>([]);

  const boardColumnOrderMutation = trpc.useMutation([
    'board.updateColumnOrder',
  ]);

  useEffect(() => {
    if (board && board.Column) {
      setColumnOrderState(
        board.columnOrder
          ? board.columnOrder.split(',')
          : board.Column.map((column) => column.id),
      );
    }
  }, [board]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.type === 'column') {
      const columnOrder = reorderList(
        columnOrderState,
        result.source.index,
        result.destination.index,
      );
      boardColumnOrderMutation.mutate({
        id: selectedBoard,
        data: {
          columnOrder: columnOrder,
        },
      });
      setColumnOrderState(columnOrder);
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      console.log('Same list');
      // const column = state.columns[result.source.droppableId];
      // const items = reorderList(
      //   column.items,
      //   result.source.index,
      //   result.destination.index,
      // );
      // // updating column entry
      // const newState = {
      //   ...state,
      //   columns: {
      //     ...state.columns,
      //     [column.id]: {
      //       ...column,
      //       items,
      //     },
      //   },
      // };
      // setState(newState);
      // return;
    }
  };

  if (board && board?.Column?.length < 1) return <EmptyBoard />;

  return (
    <div className="h-screen max-h-screen">
      <div className="h-full px-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-droppables"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex items-start w-full mt-6 overflow-x-auto overflow-y-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrderState?.map((item: string, idx: number) => {
                  const column = board?.Column.filter(
                    (column: any) => column.id === item,
                  )[0];

                  if (!column) return;
                  return (
                    <Column
                      index={idx}
                      taskOrderId=""
                      task={column?.task || []}
                      title={column?.title || ''}
                      id={column?.id || ''}
                      key={column?.id}
                      setSelectedTaskId={(taskId) => {
                        setSelectedModal(ModalType.ViewTask);
                        setViewTask(taskId);
                      }}
                    />
                  );
                })}
                {/* <div className="grid text-medium-grey font-bold text-xl h-screen mt-10 bg-white dark:bg-dark-grey rounded-lg w-[17.5rem] place-content-center ">
                    <button
                      onClick={() => setSelectedModal(ModalType.EditBoard)}
                      className="flex items-center transition-all cursor-pointer hover:text-main-purple decoration-transparent hover:decoration-current gap-x-2"
                    >
                      <AiOutlinePlus />
                      <span>Add new column</span>
                    </button>
                  </div> */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
