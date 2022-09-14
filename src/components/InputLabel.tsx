import { FC } from 'react';
interface InputLabelProps {
  label: string;
  htmlFor: string;
}

const InputLabel: FC<InputLabelProps> = ({ label, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-xs font-bold text-medium-grey">
      {label}
    </label>
  );
};

export default InputLabel;
