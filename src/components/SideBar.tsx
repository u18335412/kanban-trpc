import { FC, useEffect } from 'react';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { trpc } from '../utils/trpc';
import useAppStore from '~/data/useStore';

const SideBar: FC = () => {
  const { setSelectedBoard } = useAppStore();
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
    <aside className="w-[10%] min-w-min">
      <p className="uppercase">All boards({data?.length})</p>
      <ul className="flex flex-col mt-4 gap-y-2">
        {data?.map(({ id, title }) => {
          return (
            <li
              onClick={() => updateSelectedBoard(id)}
              key={id}
              className="flex items-center gap-x-2 cursor-pointer "
            >
              <TbLayoutBoardSplit className="min-w-4 min-h-4" />
              <span className="w-full">{title}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
