import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import useAppStore from '~/data/useStore';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ModalManager, { ModalType } from '~/components/ModalManager';
import Button from '~/components/Button';
import DropDown from '~/components/DropDown';
import { ImSpinner8 } from 'react-icons/im';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Board from '~/components/Board';

const DndPage: NextPageWithLayout = () => {
  const { selectedBoard, setSelectedModal, setDelete } = useAppStore();
  const { isLoading, data, isError } = trpc.useQuery([
    'board.byId',
    { id: selectedBoard },
  ]);

  const DropDownItems = [
    {
      text: 'Edit Board',
      action: () => {
        setSelectedModal(ModalType.EditBoard);
      },
    },
    {
      text: 'Delete Board',
      action: () => {
        setSelectedModal(ModalType.DeleteModal);
        setDelete('board');
      },
      text_color: 'text-red',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid h-full place-content-center">
        <ImSpinner8 className="w-5 h-5 white animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid h-full place-content-center">
        <h2 className=" text-[5rem] text-medium-grey">500</h2>
        <p className="font-bold text-red text-md">
          An error has occured while fetching the data.
        </p>
      </div>
    );
  }
  return (
    <>
      <ToastContainer
        hideProgressBar
        toastClassName=" text-sm dark:bg-dark-grey dark:text-white text-black font-medium"
      />
      <ModalManager />
      <div className="flex items-center justify-between h-24 px-6 bg-white dark:bg-dark-grey">
        <h2 className="text-xl font-bold">{data && data.title}</h2>
        <div className="flex items-center gap-x-6">
          <Button
            disabled={data && data?.Column?.length === 0 ? true : false}
            icon={<AiOutlinePlus />}
            onClick={() => setSelectedModal(ModalType.NewTask)}
            className=" bg-main-purple hover:bg"
          >
            <span className="hidden md:flex"> Add New Task</span>
          </Button>
          <div>
            <DropDown icon={<BsThreeDotsVertical />} items={DropDownItems} />
          </div>
        </div>
      </div>
      <Board board={data} />
    </>
  );
};

export default DndPage;
