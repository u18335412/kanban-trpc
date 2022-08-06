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
      className="p-4 transition-shadow bg-white rounded-md cursor-pointer hover:shadow-md"
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs">
        {subtasks_completed} of {subtask_length} subtasks
      </p>
    </div>
  );
};

export default Task;
