import { FC, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Task from '~/components/Task';

interface ColumnProps {
  column: {
    task: {
      title: string;
      id: string;
      Sub_Task: any;
    }[];
    title: string;
    id: string;
  };
}

const Column: FC<ColumnProps> = ({ column: { task, title, id } }) => {
  const [tasks, setTasks] = useState<any[]>(task || []);
  console.log(title);
  return (
    <div className=" w-60">
      <p className=" cursor-move column-handle">
        {title} ({task.length})
      </p>
      <ReactSortable
        tag="ul"
        list={tasks}
        setList={setTasks}
        group="group"
        animation={200}
        delay={2}
        className="flex flex-col mt-2 gap-y-3"
      >
        {tasks.map(({ title, id, Sub_Task }) => {
          return (
            <li
              key={id}
              //   onClick={() => {
              //     setSelectedTaskId(id);
              //     setIsOpen(true);
              //   }}
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
