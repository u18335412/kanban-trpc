import { FC } from 'react';
import useTheme from '../data/useTheme';

export default function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();
  console.log(theme);
  return (
    <div className="flex items-center justify-center py-4 mx-6 transition-all rounded-md gap-x-6 dark:bg-very-dark-grey bg-light-grey">
      <img
        src="/assets/icon-light-theme.svg"
        className=" w-[1.125rem] h-[1.125rem]"
        alt="light theme"
      />
      <div className="relative p-[0.188rem] w-10 h-5 rounded-full bg-main-purple">
        <input
          onChange={toggleTheme}
          defaultChecked={theme === 'dark' ? true : false}
          type="checkbox"
          name="theme"
          className="w-full h-full appearance-none cursor-pointer peer"
        />
        <span className=" w-[0.875rem] h-[0.875rem] bg-white pointer-events-none transition-all peer-checked:-translate-x-8 absolute -translate-x-4 rounded-full"></span>
      </div>
      <img
        src="/assets/icon-dark-theme.svg"
        className=" w-[1.125rem] h-[1.125rem]"
        alt="dark theme"
      />
    </div>
  );
}
