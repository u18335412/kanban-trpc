import { Fragment, FC } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import useTheme from '~/data/useTheme';
import { FiChevronDown } from 'react-icons/fi';
export interface StatusItemsInterface {
  value: string;
  text: string;
}
interface StatusSelectProps {
  statusItems: StatusItemsInterface[] | undefined;
  selected: StatusItemsInterface | undefined;
  setSelected: any;
}

const StatusSelect: FC<StatusSelectProps> = ({
  statusItems,
  setSelected,
  selected,
}) => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full px-4 py-2 text-left ring-1 dark:ring-[rgba(130,143,163,0.25)] rounded-[4px] outline-1 hover:outline outline-main-purple font-medium text-sm">
            <span className="block truncate">{selected?.text}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="w-5 h-5 text-main-purple" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="ease-out"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full p-4 mt-3 space-y-2 overflow-auto text-sm font-medium bg-white rounded-lg shadow-lg dark:bg-very-dark-grey text-medium-grey max-h-60 ring-opacity-5 focus:outline-none sm:text-sm">
              {statusItems?.map((column) => (
                <Listbox.Option
                  key={column.value}
                  className={({ active }) =>
                    `relative cursor-default select-none${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={column}
                >
                  <span className="block truncate transition-all cursor-pointer  hover:text-white">
                    {column.text}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default StatusSelect;
