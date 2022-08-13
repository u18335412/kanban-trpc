import { FC, useEffect, useState } from 'react';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiShow, BiHide } from 'react-icons/bi';
import { trpc } from '../utils/trpc';
import useAppStore from '~/data/useStore';

const SideBar: FC = () => {
  const [hideSideBar, setHideSideBar] = useState<boolean>(false);
  const { setSelectedBoard, selectedBoard } = useAppStore();
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

  return (
    <>
      {!hideSideBar && (
        <aside className="flex flex-col py-4 min-w-[15rem]">
          <div className="px-4">
            <p className="text-xl font-bold">Kanban</p>
          </div>
          <div className="mt-8">
            <p className="px-4 uppercase">All boards({data?.length})</p>
            <nav className="text-sm">
              <ul className="flex flex-col mt-4 gap-y-2 ">
                {data?.map(({ id, title }) => {
                  return (
                    <li
                      onClick={() => updateSelectedBoard(id)}
                      key={id}
                      className={`flex items-center cursor-pointer py-2 gap-x-2 px-4 ${
                        selectedBoard === id
                          ? 'bg-indigo-500 text-white transition-all mr-8 rounded-r-full'
                          : ''
                      }`}
                    >
                      <TbLayoutBoardSplit className="w-5 h-5" />
                      <span className="w-full">{title}</span>
                    </li>
                  );
                })}
                <li className="flex items-center px-4 text-indigo-500 cursor-pointer gap-x-2">
                  <TbLayoutBoardSplit className="w-5 h-5" />
                  <div className="flex items-center w-full">
                    <AiOutlinePlus className="w-5 h-5" />
                    <span className="w-full">Create New Board</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center px-4 gap-x-2 mt-auto">
            <div className="relative">
              <BiHide className="pointer-events-none " />
              <input
                defaultChecked={hideSideBar}
                type="checkbox"
                className="absolute inset-0 w-full h-full appearance-none cursor-pointer"
                onChange={() => setHideSideBar(!hideSideBar)}
              />
            </div>
            <span>Hide Sideabr</span>
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;
