import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { trpc } from '../utils/trpc';
import useAppStore from '~/data/useStore';
import { ModalType } from './ModalManager';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useRouter } from 'next/router';
const SideBar: FC = () => {
  const router = useRouter();
  const {
    setSelectedBoard,
    selectedBoard,
    setSelectedModal,
    showSideBar,
    toggleSideBar,
  } = useAppStore();
  const { isLoading, data } = trpc.useQuery(['board.all']);

  const updateSelectedBoard = (id: string) => {
    setSelectedBoard(id);
  };

  if (isLoading) return <div className=" animate-pulse">Loading</div>;

  return (
    <aside className="flex flex-col pb-8 min-w-[18.75rem] h-sreen dark:bg-dark-grey border border-lines(light) dark:border-lines(dark)">
      <div className="flex items-center h-24 px-8">
        <Logo />
      </div>
      <div className="mt-4">
        <p className="px-8 text-xs tracking-[0.15rem] font-bold uppercase text-medium-grey">
          All boards({data?.length})
        </p>
        <nav className="font-bold text-md">
          <ul className="flex flex-col mt-5">
            {data?.map(({ id, title }: { id: string; title: string }) => {
              return (
                <li
                  onClick={() => {
                    updateSelectedBoard(id);
                    router.push(`/board/${id}`);
                  }}
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
                    className={`w-full ${
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
              defaultChecked={showSideBar}
              type="checkbox"
              className="absolute inset-0 w-full h-full appearance-none cursor-pointer"
              onChange={toggleSideBar}
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
  );
};

export default SideBar;
