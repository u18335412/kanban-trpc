import { FC } from 'react';

const Task: FC<{
  id: string;
  title: string;
  subtask_length: number;
  subtasks_completed: number;
}> = ({ id, title, subtask_length, subtasks_completed }) => {
  return (
    <div
      key={id}
      className="p-4 transition-shadow bg-white rounded-md cursor-pointer dark:bg-dark-grey shadow-md group dark:shadow-[rgba(54,78,126,0.1015)]"
    >
      <h3 className="font-bold transition-all text-md group-hover:text-main-purple">
        {title}
      </h3>
      <p className="text-xs font-bold dark:text-medium-grey">
        {subtasks_completed} of {subtask_length} subtasks
      </p>
    </div>
  );
};

export default Task;
