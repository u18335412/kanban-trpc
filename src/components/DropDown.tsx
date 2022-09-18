import { Menu, Transition } from '@headlessui/react';
import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
interface DropDownItemInterface {
  text: string;
  action: () => void;
  text_color?: string;
}

interface DropDownProps {
  text?: string;
  icon?: ReactNode;
  items: DropDownItemInterface[];
  className?: string;
}

const DropDown: FC<DropDownProps> = ({ items, text, icon, className }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          {icon}
          <span className="block truncate">{text}</span>
        </Menu.Button>
      </div>
      <Transition
        appear
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 flex flex-col w-48 p-4 mt-8 origin-top-right bg-white rounded-md shadow-lg min-w-fit dark:bg-very-dark-grey gap-y-4 ${className}`}
        >
          {items.map(({ text, action, text_color = 'text-medium-grey' }) => {
            return (
              <div key={text + action}>
                <Menu.Item>
                  <button
                    onClick={action}
                    className={clsx(
                      'group font-medium flex w-full items-center rounded-md text-sm',
                      text_color,
                    )}
                  >
                    {text}
                  </button>
                </Menu.Item>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
