import { FC } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form';
interface InputLabelProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
}

const Input: FC<InputLabelProps> = ({
  id,
  type = 'text',
  placeholder,
  register,
  errors,
}) => {
  if (type === 'textarea')
    return (
      <textarea
        rows={4}
        id={id}
        placeholder={placeholder}
        {...register(id, { required: true })}
        className="px-4 py-2 dark:bg-dark-grey  text-sm outline-1 w-full outline-main-purple rounded placeholder:font-medium ring-[rgba(130,143,163,0.25)] ring-1"
      ></textarea>
    );

  console.log(errors);

  console.log('sub', errors[`${id}`]);

  return (
    <div className="relative w-full">
      <input
        {...register(id, { required: true })}
        type={type}
        id={id}
        className={`px-4 py-2 dark:bg-dark-grey text-sm outline-1 w-full outline-main-purple rounded placeholder:font-medium ring-[rgba(130,143,163,0.85)] ring-1 ${
          errors[`${id}`] && 'ring-red'
        } `}
        placeholder={placeholder}
      />
      {errors[`${id}`] && (
        <p className="absolute text-sm font-medium right-4 top-2 text-red">
          Can&apos;t be empty
        </p>
      )}
    </div>
  );
};

export default Input;
