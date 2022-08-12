import { FC } from 'react';
import NewTaskModal from './NewTaskModal';
import ViewTaskModal from './ViewTaskModal';

export enum ModalType {
  None = 'None',
  NewTask = 'NewTask',
  ViewTask = 'ViewTask',
}

const ModalManager: FC<{ openModal: ModalType; closeModal: () => void }> = ({
  openModal,
  closeModal,
}) => {
  return (
    <div>
      <ViewTaskModal
        closeModal={closeModal}
        isOpen={openModal === ModalType.ViewTask}
      />
      <NewTaskModal
        closeModal={closeModal}
        isOpen={openModal === ModalType.NewTask}
      />
    </div>
  );
};

export default ModalManager;
