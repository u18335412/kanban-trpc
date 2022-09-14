import { FC } from 'react';
interface InputLabelProps {
  label: string;
  htmlFor: string;
  className?: string;
}

const InputLabel: FC<InputLabelProps> = ({ label, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-xs font-bold text-medium-grey ${className}`}
    >
      {label}
    </label>
  );
};

export default InputLabel;
