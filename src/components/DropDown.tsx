import { Menu } from '@headlessui/react';
import { FC, ReactNode } from 'react';
import TransitionChild from './Transition';

interface DropDownItemInterface {
  text: string;
  action: () => void;
  text_color?: string;
}

interface DropDownProps {
  text?: string;
  icon?: ReactNode;
  items: DropDownItemInterface[];
}

const DropDown: FC<DropDownProps> = ({ items, text, icon }) => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            {icon}
            <span className="block truncate">{text}</span>
          </Menu.Button>
        </div>
        <TransitionChild>
          <Menu.Items className="absolute right-0 flex flex-col w-48 p-4 mt-8 origin-top-right bg-white rounded-md shadow-lg min-w-fit dark:bg-very-dark-grey gap-y-4">
            {items.map(({ text, action, text_color }) => {
              return (
                <div className="" key={text + action}>
                  <Menu.Item>
                    <button
                      onClick={action}
                      className={`group text-medium-grey font-medium flex w-full items-center rounded-md text-sm ${text_color}`}
                    >
                      {text}
                    </button>
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </TransitionChild>
      </Menu>
    </div>
  );
};

export default DropDown;
