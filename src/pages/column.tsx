import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import ViewTaskModal from '~/components/ViewTaskModal';
import { ReactSortable } from 'react-sortablejs';
import Column from '~/components/Column';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  const boards = trpc.useQuery(['board.all']);
  const columns = trpc.useQuery(['column.all']);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [columnsState, setColumns] = useState(columns?.data || []);
  // const addPost = trpc.useMutation('post.add', {
  //   async onSuccess() {
  //     // refetches posts after a post is added
  //     await utils.invalidateQueries(['post.all']);
  //   },
  // });

  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      {isOpen && (
        <ViewTaskModal
          taskId={selectedTaskId}
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          openModal={() => setIsOpen(true)}
        />
      )}

      <div className="flex items-start">
        <div className="w-[20%] h-full min-h-screen bg-lime-100 px-2">
          <p className="text-lg font-extralight">
            All BOARDS ({boards.data?.length})
          </p>
          <div className="mt-4 space-y-2">
            {boards.isLoading ? (
              <div></div>
            ) : (
              boards.data?.map((item) => (
                <div key={item.id}>
                  <h4 className="flex items-center gap-x-2">
                    <TbLayoutBoardSplit /> {item.title}
                  </h4>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-full h-full min-h-screen px-2">
          <div>
            <h2>{boards.data?.[0] && <>{boards.data[0].title}</>}</h2>
          </div>
          <ReactSortable
            list={columnsState}
            setList={setColumns}
            group={boards.data?.[0]?.title}
            animation={200}
            delay={2}
            handle=".column-handle"
            className="flex mt-4 gap-x-4 overscroll-x-auto"
          >
            {columnsState.map((column) => {
              return <Column column={column} key={column.id} />;
            })}
          </ReactSortable>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
