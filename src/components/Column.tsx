import { FC, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Task from '~/components/Task';
import { Task as TaskType } from '@prisma/client';
interface ColumnProps {
  task: TaskType[];
  title: string;
  id: string;
  setSelectedTaskId: (taskId: string) => void;
}

const Column: FC<ColumnProps> = ({ task, title, setSelectedTaskId }) => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    setTasks(task);
  }, [task]);

  return (
    <div className="w-60">
      <p className="cursor-move column-handle">
        {title} ({task.length})
      </p>
      <ReactSortable
        tag="ul"
        list={tasks}
        setList={setTasks}
        group="group"
        animation={200}
        delay={2}
        className="flex h-full flex-col mt-2  gap-y-3  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
        [scrollbar-width:none]
      }"
      >
        {tasks.map(({ title, id, Sub_Task }) => {
          return (
            <li
              key={id}
              onClick={() => {
                setSelectedTaskId(id);
              }}
            >
              <Task
                id={id}
                title={title}
                subtask_length={Sub_Task.length}
                subtasks_completed={
                  Sub_Task.filter((sub_task: any) => sub_task.complete === true)
                    .length
                }
              />
            </li>
          );
        })}
      </ReactSortable>
    </div>
  );
};

export default Column;
