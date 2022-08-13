import { FC, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Task from '~/components/Task';
import { Sub_Task, Task as TaskType } from '@prisma/client';
type ExtendedTask = TaskType & { Sub_Task: Sub_Task[] };
interface ColumnProps {
  task: ExtendedTask[];
  title: string;
  id: string;
  setSelectedTaskId: (taskId: string) => void;
}

const Column: FC<ColumnProps> = ({ task, title, setSelectedTaskId }) => {
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);

  const handleTaskAddedFromAnotherList = (taskId: string) => {
    console.log(`task: ${taskId} added to list ${title}`);
  };

  useEffect(() => {
    setTasks(task);
  }, [task]);

  return (
    <div className="w-60 ">
      <p className="text-sm cursor-move column-handle">
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
        onAdd={(event) =>
          handleTaskAddedFromAnotherList(event.item.dataset.id || '')
        }
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
