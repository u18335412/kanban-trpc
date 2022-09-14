import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: (args: any) => void;
  children: string;
  additionalStyles?: string;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className,
  icon,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`font-bold text-md bg-main-purple hover:bg-main-purple(hover) rounded-full text-white px-[1.5rem] py-[0.938rem] transition-all flex gap-x-1 items-center ${className} disabled:opacity-25 disabled:cursor-not-allowed`}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
};

export default Button;
