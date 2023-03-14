import autoAnimate from '@formkit/auto-animate';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import Board from '~/components/Board';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import useAppStore from '~/data/useStore';
import { trpc } from '~/utils/trpc';

const Index: FC = () => {
  const router = useRouter();
  const { showSideBar, selectedBoard, setSelectedBoard } = useAppStore();
  const parent = useRef<HTMLDivElement>(null);
  const { isLoading, data, isError } = trpc.useQuery([
    'board.byId',
    { id: router.query?.id?.toString() || selectedBoard },
  ]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [showSideBar]);

  useEffect(() => {
    setSelectedBoard(router.query?.id?.toString() || '');
  }, [router.query?.id, setSelectedBoard]);

  if (isLoading) {
    return (
      <div className="grid h-full place-content-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid h-full place-content-center">
        <h2 className=" text-[5rem] text-medium-grey">500</h2>
        <p className="font-bold text-red text-md">
          An error has occurred while fetching the data.
        </p>
      </div>
    );
  }
  return (
    <>
      <Header
        title={(data && data.title) || ''}
        columnLength={(data && data.Column.length) || 0}
      />
      <Board board={data} />
    </>
  );
};

export default Index;
