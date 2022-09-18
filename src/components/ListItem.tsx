import { FC, memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { Sub_Task } from '@prisma/client';
import { areEqual } from 'react-window';

const ListItem: FC<{
  index: number;
  id: string;
  title: string;
  Sub_task: Sub_Task[];
  setSelectedTaskId: (taskId: string) => void;
}> = ({ id, index, title, setSelectedTaskId, Sub_task }) => {
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {
            setSelectedTaskId(id);
          }}
        >
          <Task
            index={index}
            id={id}
            title={title}
            subtask_length={Sub_task.length}
            subtasks_completed={
              Sub_task.filter(
                (sub_task: Sub_Task) => sub_task.complete === true,
              ).length
            }
          />
        </li>
      )}
    </Draggable>
  );
};

export default memo(ListItem, areEqual);
