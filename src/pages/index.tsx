import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import ViewTaskModal from '~/components/ViewTaskModal';
import { ReactSortable } from 'react-sortablejs';
import Column from '~/components/Column';
import useAppStore from '~/data/useStore';

const IndexPage: NextPageWithLayout = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { selectedBoard } = useAppStore();
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
      {selectedTaskId && (
        <ViewTaskModal
          taskId={selectedTaskId}
          closeModal={() => setSelectedTaskId(null)}
          isOpen={selectedTaskId !== null}
        />
      )}
      <div className="flex items-start w-full overflow-x-auto">
        <div className="h-full min-h-screen px-2 ">
          <div>
            <h2>{data && <>{data.title}</>}</h2>
          </div>
          <ReactSortable
            list={columnsState}
            setList={setColumnsState}
            group={'board'}
            animation={200}
            delay={2}
            handle=".column-handle"
            className="flex mt-4 gap-x-4"
          >
            {columnsState?.map((column) => {
              return (
                <Column
                  column={column}
                  key={column.id}
                  setSelectedTaskId={setSelectedTaskId}
                />
              );
            })}
          </ReactSortable>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
