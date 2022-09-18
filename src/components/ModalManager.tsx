import { FC } from 'react';
import useAppStore from '~/data/useStore';
import DeleteModal from './DeleteModal';
import EditBoardModal from './EditBoardModal';
import EditTaskModal from './EditTask';
import NewBoardModal from './NewBoardModal';
import NewTaskModal from './NewTaskModal';
import ViewTaskModal from './ViewTaskModal';

export enum ModalType {
  None = 'None',
  NewTask = 'NewTask',
  ViewTask = 'ViewTask',
  NewBoard = 'NewBoard',
  EditTask = 'EditTask',
  DeleteModal = 'DeleteModal',
  EditBoard = 'EditBoard',
}

const ModalManager: FC = () => {
  const { selectedModal, setSelectedModal } = useAppStore();
  const closeModal = () => setSelectedModal(ModalType.None);

  // const DynamicViewTaskModal = dynamic(() => import('./ViewTaskModal'));

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
      <EditTaskModal
        closeModal={closeModal}
        isOpen={selectedModal === ModalType.EditTask}
      />
      <DeleteModal
        closeModal={closeModal}
        isOpen={selectedModal === ModalType.DeleteModal}
      />
      <EditBoardModal
        closeModal={closeModal}
        isOpen={selectedModal === ModalType.EditBoard}
      />
    </div>
  );
};

export default ModalManager;
