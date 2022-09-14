import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { ReactSortable } from 'react-sortablejs';
import Column from '~/components/Column';
import useAppStore from '~/data/useStore';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ModalManager, { ModalType } from '~/components/ModalManager';
import Button from '~/components/Button';
import EmptyBoard from '~/components/EmptyBoard';
import DropDown from '~/components/DropDown';

const IndexPage: NextPageWithLayout = () => {
  const { selectedBoard, setViewTask, setSelectedModal, setDelete } =
    useAppStore();
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

  const DropDownItems = [
    {
      text: 'Edit Board',
      action: () => [],
    },
    {
      text: 'Delete Board',
      action: () => {
        setSelectedModal(ModalType.DeleteModal);
        setDelete('board');
      },
      text_color: ' text-red',
    },
  ];

  if (isLoading) {
    return <div className="animate-pulse">Loading</div>;
  }

  return (
    <>
      <ModalManager />
      <div className="flex items-center justify-between h-24 px-6 bg-white dark:bg-dark-grey">
        <h2 className="text-xl font-bold">{data && data.title}</h2>
        <div className="flex items-center gap-x-6">
          <Button
            disabled={data && data?.Column?.length === 0 ? true : false}
            icon={<AiOutlinePlus />}
            className=""
            onClick={() => setSelectedModal(ModalType.NewTask)}
          >
            Add New Task
          </Button>
          <div>
            <DropDown icon={<BsThreeDotsVertical />} items={DropDownItems} />
          </div>
        </div>
      </div>
      {data && data?.Column?.length > 1 ? (
        <div className="flex items-start w-full overflow-x-auto overflow-y-auto">
          <div className="h-full px-6">
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
              <div className="grid text-medium-grey font-bold text-xl h-screen mt-10 bg-white dark:bg-dark-grey rounded-lg w-[17.5rem] place-content-center ">
                <button className="flex items-center transition-all cursor-pointer hover:text-main-purple decoration-transparent hover:decoration-current gap-x-2">
                  <AiOutlinePlus />
                  <p>Add new column</p>
                </button>
              </div>
            </ReactSortable>
          </div>
        </div>
      ) : (
        <EmptyBoard />
      )}
    </>
  );
};

export default IndexPage;
