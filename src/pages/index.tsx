import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { ReactSortable } from 'react-sortablejs';
import Column from '~/components/Column';
import useAppStore from '~/data/useStore';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ModalManager, { ModalType } from '~/components/ModalManager';

const IndexPage: NextPageWithLayout = () => {
  const { selectedBoard, setViewTask, setSelectedModal } = useAppStore();
  const [columnsState, setColumnsState] = useState<any[]>([]);
  const { isLoading, data } = trpc.useQuery([
    'board.byId',
    { id: selectedBoard },
  ]);

  useEffect(() => {
    if (!isLoading && data) {
      setColumnsState(data.Column);
    }
  }, [data, isLoading, selectedBoard]);

  if (isLoading) {
    return <div className="animate-pulse">Loading</div>;
  }

  return (
    <>
      <ModalManager />

      <div className="flex justify-between px-2 py-4 bg-white ">
        <h2>{data && data.title}</h2>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setSelectedModal(ModalType.NewTask)}
            className="flex items-center px-4 py-1 rounded-full gap-x-2 ring-2 ring-black"
          >
            <AiOutlinePlus />
            <span className="hidden md:flex">Add New Task</span>
          </button>
          <BsThreeDotsVertical className="cursor-pointer min-w-4 min-h-4" />
        </div>
      </div>
      <div className="flex items-start w-full overflow-x-auto overflow-y-auto">
        <div className="h-full px-2">
          <ReactSortable
            list={columnsState}
            setList={setColumnsState}
            group={'board'}
            animation={200}
            delay={2}
            handle=".column-handle"
            className="flex mt-4 gap-x-4 "
          >
            {columnsState?.map(({ title, id, task }) => {
              return (
                <Column
                  task={task || []}
                  title={title}
                  id={id}
                  key={id}
                  setSelectedTaskId={(taskId) => {
                    setSelectedModal(ModalType.ViewTask);
                    setViewTask(taskId);
                  }}
                />
              );
            })}
            <div className="grid h-screen mt-8 bg-white rounded-lg w-60 place-content-center">
              <button className="flex items-center underline transition-all cursor-pointer decoration-transparent hover:decoration-current gap-x-2">
                <AiOutlinePlus />
                <p>Add new column</p>
              </button>
            </div>
          </ReactSortable>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
