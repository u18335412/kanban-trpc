import { useState, FC, useEffect } from 'react';
import useAppStore from '~/data/useStore';
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
  const { viewTask } = useAppStore();

  return (
    <div>
      <ViewTaskModal
        taskId={viewTask}
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
