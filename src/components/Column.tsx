import { FC, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Task from '~/components/Task';
import { Sub_Task, Task as TaskType } from '@prisma/client';
import { trpc } from '~/utils/trpc';
// import useAppStore from '~/data/useStore';

type ExtendedTask = TaskType & { Sub_Task: Sub_Task[] };
interface ColumnProps {
  task: ExtendedTask[];
  title: string;
  id: string;
  setSelectedTaskId: (taskId: string) => void;
}

const Column: FC<ColumnProps> = ({ task, title, setSelectedTaskId, id }) => {
  // const { selectedBoard } = useAppStore();
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);
  const mutate = trpc.useMutation(['task.switchColumns']);
  // const utils = trpc.useContext();
  const handleTaskAddedFromAnotherList = (taskId: string) => {
    mutate.mutate(
      {
        id: taskId,
        data: {
          to_column_id: id,
        },
      },
      {
        onSuccess: (res) => {
          console.log('success', res);
          // utils.invalidateQueries(['board.byId', { id: selectedBoard }]);
        },
      },
    );
  };
  useEffect(() => {
    setTasks(task);
  }, [task]);
  return (
    <div className="transition-all w-[17.5rem]">
      <div>
        <p className="text-xs tracking-[0.15rem] font-bold cursor-move column-handle">
          {title} ({task.length})
        </p>
      </div>
      <ReactSortable
        store={{
          get: function (sortable) {
            console.log(sortable); // even this is not being logged
            // const order = localStorage.getItem(sortable.options.group.name);
            return [];
          },

          set: function (sortable) {
            const order = sortable.toArray();
            console.log('order', order);
            // localStorage.setItem(sortable.options.group.name, order.join('|'));
          },
        }}
        tag="ul"
        list={tasks}
        setList={setTasks}
        group="group"
        animation={200}
        delay={2}
        className="flex h-full flex-col mt-6 gap-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
        [scrollbar-width:none]"
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
                  Sub_Task.filter(
                    (sub_task: Sub_Task) => sub_task.complete === true,
                  ).length
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
