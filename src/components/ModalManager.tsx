import { FC } from 'react';
import useAppStore from '~/data/useStore';
import NewBoardModal from './NewBoardModal';
import NewTaskModal from './NewTaskModal';
import ViewTaskModal from './ViewTaskModal';

export enum ModalType {
  None = 'None',
  NewTask = 'NewTask',
  ViewTask = 'ViewTask',
  NewBoard = 'NewBoard',
}

const ModalManager: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { selectedModal } = useAppStore();
  return (
    <div>
      <ViewTaskModal
        closeModal={closeModal}
        isOpen={selectedModal === ModalType.ViewTask}
      />
      <NewTaskModal
        closeModal={closeModal}
        isOpen={selectedModal === ModalType.NewTask}
      />
      <NewBoardModal
        closeModal={closeModal}
        isOpen={selectedModal === ModalType.NewBoard}
      />
    </div>
  );
};

export default ModalManager;
