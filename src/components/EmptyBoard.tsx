import { FC } from 'react';
import Button from './Button';
import { AiOutlinePlus } from 'react-icons/ai';
import useAppStore from '~/data/useStore';
import { ModalType } from './ModalManager';

const EmptyBoard: FC = () => {
  const { setSelectedModal } = useAppStore();
  return (
    <div className="grid w-full h-full place-content-center">
      <div className="flex flex-col items-center gap-y-8">
        <p className="font-bold text-medium-grey">
          This board is empty. Create a new column to get started.
        </p>
        <Button
          icon={<AiOutlinePlus />}
          onClick={() => setSelectedModal(ModalType.EditBoard)}
        >
          Add New Column
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
