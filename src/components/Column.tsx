import { FC, useEffect, useState, memo } from 'react';
import { Sub_Task, Task as TaskType } from '@prisma/client';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ListItem from './ListItem';

export type ExtendedTask = TaskType & { Sub_Task: Sub_Task[] };
interface ColumnProps {
  task: ExtendedTask[];
  title: string;
  id: string;
  setSelectedTaskId: (taskId: string) => void;
  taskOrderId: string;
  index: number;
}

const Column: FC<ColumnProps> = ({
  task,
  title,
  setSelectedTaskId,
  id,
  index,
}) => {
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);

  useEffect(() => {
    setTasks(task);
  }, [task]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="max-w-[17.5rem] min-w-[17.5rem] max-h-screen h-screen mr-6"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps}>
            <p className="text-xs tracking-[0.15rem] font-bold cursor-move column-handle uppercase">
              {title} ({task.length})
              <span className="text-xs text-main-purple">{id}</span>
            </p>
          </div>
          <div>
            <Droppable droppableId={id}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex h-full flex-col mt-6 gap-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
                  [scrollbar-width:none]"
                >
                  {tasks.map(({ title, id, Sub_Task }, idx) => {
                    return (
                      <ListItem
                        key={id}
                        index={idx}
                        id={id}
                        title={title}
                        Sub_task={Sub_Task}
                        setSelectedTaskId={() => {
                          setSelectedTaskId(id);
                        }}
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(Column);
