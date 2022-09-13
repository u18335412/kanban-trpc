import { FC, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { trpc } from '../utils/trpc';
import useAppStore from '~/data/useStore';
import { ModalType } from './ModalManager';
import TransitionChild from './Transition';
import { Transition } from '@headlessui/react';
import ThemeToggle from './ThemeToggle';
import useTheme from '~/data/useTheme';

const SideBar: FC = () => {
  const { theme } = useTheme();
  const [hideSideBar, setHideSideBar] = useState<boolean>(true);
  const { setSelectedBoard, selectedBoard, setSelectedModal } = useAppStore();
  const { isLoading, data } = trpc.useQuery(['board.all']);

  const updateSelectedBoard = (id: string) => {
    setSelectedBoard(id);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setSelectedBoard(data[0]?.id || '');
    }
  }, [data, isLoading, setSelectedBoard]);

  if (isLoading) return <div className=" animate-pulse">Loading</div>;

  if (!hideSideBar) {
    return (
      <button
        onClick={() => setHideSideBar((prev) => !prev)}
        className="absolute flex items-center justify-center h-12 rounded-r-full bottom-8 bg-main-purple w-14"
      >
        <img src="/assets/icon-show-sidebar.svg" alt="show sidebar" />
      </button>
    );
  }

  return (
    <Transition appear show={hideSideBar}>
      <TransitionChild>
        <aside className="flex flex-col pb-8 min-w-[18.75rem] h-full dark:bg-dark-grey">
          <div className="flex items-center h-24 px-8">
            {theme === 'dark' ? (
              <img src="/assets/logo-light.svg" alt="logo light" />
            ) : (
              <img src="/assets/logo-dark.svg" alt="logo dark" />
            )}
          </div>
          <div className="mt-4">
            <p className="px-8 text-xs tracking-[0.15rem] font-bold uppercase text-medium-grey">
              All boards({data?.length})
            </p>
            <nav className="font-bold text-md">
              <ul className="flex flex-col mt-5">
                {data?.map(({ id, title }) => {
                  return (
                    <li
                      onClick={() => updateSelectedBoard(id)}
                      key={id}
                      className={`flex  group  mr-8 rounded-r-full transition-all items-center cursor-pointer py-4 gap-x-4 px-8 ${
                        selectedBoard === id
                          ? ' bg-main-purple hover:bg-main-purple text-white transition-all '
                          : 'hover:bg-white'
                      }`}
                    >
                      <div
                        className={` [mask:url('/assets/icon-board.svg') _no-repeat_center_/_contain]
                        [-webkit-mask:url('/assets/icon-board.svg')no-repeat__center_/_contain]
                        w-4 h-4 ${
                          selectedBoard === id ? 'bg-white' : ' bg-medium-grey'
                        }`}
                      />
                      <span
                        className={`w-full  ${
                          selectedBoard === id
                            ? ' text-white '
                            : 'text-medium-grey group-hover:text-main-purple'
                        }`}
                      >
                        {title}
                      </span>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => setSelectedModal(ModalType.NewBoard)}
                    className="flex items-center px-8 py-4 text-indigo-500 cursor-pointer gap-x-4"
                  >
                    <div
                      className={`[mask:url('/assets/icon-board.svg') _no-repeat_center_/_contain]
                        [-webkit-mask:url('/assets/icon-board.svg')no-repeat__center_/_contain]
                        w-4 h-4 bg-main-purple`}
                    />
                    <div className="flex items-center w-full text-main-purple">
                      <AiOutlinePlus className="w-4 h-4" />
                      <span className="w-full">Create New Board</span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-auto">
            <ThemeToggle />
            <div className="px-6 mt-5">
              <div className="relative flex items-center gap-x-2 ">
                <img
                  className="w-4 h-4 "
                  src="/assets/icon-hide-sidebar.svg"
                  alt="hide side bar"
                />
                <input
                  name="hideSideBar"
                  defaultChecked={hideSideBar}
                  type="checkbox"
                  className="absolute inset-0 w-full h-full appearance-none cursor-pointer"
                  onChange={() => setHideSideBar(!hideSideBar)}
                />
                <label
                  htmlFor="hideSideBar"
                  className="font-bold pointer-events-none text-medium-grey text-md"
                >
                  Hide Sidebar
                </label>
              </div>
            </div>
          </div>
        </aside>
      </TransitionChild>
    </Transition>
  );
};

export default SideBar;
