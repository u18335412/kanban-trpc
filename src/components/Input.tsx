import { FC, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';

interface InputLabelProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: any;
  errors: any;
  value?: string;
  className?: string;
}

const Input: FC<InputLabelProps> = ({
  id,
  type = 'text',
  placeholder,
  register,
  errors,
  value,
  className,
}) => {
  const [error, setError] = useState<boolean>(false);
  if (type === 'textarea')
    return (
      <textarea
        defaultValue={value}
        rows={4}
        id={id}
        placeholder={placeholder}
        {...register(id, { required: true })}
        className={`px-4 py-2 dark:bg-dark-grey focus:outline text-sm outline-1 w-full outline-main-purple rounded font-medium placeholder:font-medium ring-[rgba(130,143,163,0.25)] ring-1 ${className}}`}
      ></textarea>
    );

  return (
    <div className="relative w-full">
      <input
        {...register(`${id}` as const, { required: true })}
        type={type}
        id={id}
        defaultValue={value}
        className={`px-4 py-2 dark:bg-dark-grey text-sm outline-1 focus:outline w-full rounded placeholder:font-medium font-medium focus:ring-0 outline-main-purple ring-[rgba(130,143,163,0.25)] ring-1 ${
          error && 'ring-red'
        } ${className}`}
        placeholder={placeholder}
      />
      <ErrorMessage
        errors={errors}
        name={id}
        render={() => {
          setError(true);
          return (
            <p className="absolute text-sm font-medium right-4 top-2 text-red">
              Can&apos;t be empty
            </p>
          );
        }}
      />
    </div>
  );
};

export default Input;
