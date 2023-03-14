import { FC } from 'react';

const Task: FC<{
  index: number;
  id: string;
  title: string;
  subtask_length: number;
  subtasks_completed: number;
}> = ({ id, title, subtask_length, subtasks_completed, index }) => {
  return (
    <div className="p-4 transition-shadow bg-white rounded-md cursor-pointer dark:bg-dark-grey shadow-md group dark:shadow-[rgba(54,78,126,0.1015)]">
      <h3 className="font-bold transition-all text-md group-hover:text-main-purple">
        {title}
      </h3>
      <p className="text-xs font-bold dark:text-medium-grey">
        {subtasks_completed} of {subtask_length} subtasks
      </p>
      <p className="mt-2 text-sm font-bold text-main-purple">{id}</p>
    </div>
  );
};

export default Task;
