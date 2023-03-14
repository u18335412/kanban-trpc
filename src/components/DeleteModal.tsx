import { Transition, Dialog } from '@headlessui/react';
import { FC, FormEvent, Fragment } from 'react';
import { trpc } from '~/utils/trpc';
import TransitionChild from './Transition';
import useAppStore from '~/data/useStore';
import Button from './Button';
import useTheme from '~/data/useTheme';
import { ImSpinner8 } from 'react-icons/im';
import Loading from './Loading';

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ isOpen, closeModal }) => {
  const { theme } = useTheme();
  const { deleteType, selectedBoard, viewTask, toast } = useAppStore();
  let mutation: any = null;
  const utils = trpc.useContext();
  let data = null;
  if (deleteType === 'board') {
    data = trpc.useQuery(['board.byId', { id: selectedBoard }]);
    mutation = trpc.useMutation(['board.delete']);
  } else {
    data = trpc.useQuery(['task.byId', { id: viewTask }]);
    mutation = trpc.useMutation(['task.delete']);
  }
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (deleteType === 'board') {
      mutation.mutate(
        {
          id: selectedBoard,
        },
        {
          onSuccess: () => {
            closeModal();
            utils.invalidateQueries(['board.all']);
            toast.success('Board deleted successfully.');
          },
          onError: () => {
            toast.error('An error has occurred while deleting the board.');
          },
        },
      );
      return;
    }
    mutation.mutate(
      {
        id: viewTask,
      },
      {
        onSuccess: () => {
          utils.invalidateQueries(['board.byId', { id: selectedBoard }]);
          toast.success('Task deleted successfully.');
          closeModal();
        },
        onError: () => {
          toast.error('An error has occured while deleting the task.');
        },
      },
    );
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-300 "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 "
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <div className={`fixed inset-0 overflow-y-auto ${theme}`}>
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild>
                <Dialog.Panel className="w-full max-w-md p-6 pb-10 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl dark:bg-dark-grey">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900 text-red"
                  >
                    Delete this {deleteType}?
                  </Dialog.Title>
                  <form onSubmit={handleFormSubmit}>
                    <Dialog.Description className="mt-6 text-sm font-medium text-medium-grey">
                      {deleteType === 'board' ? (
                        <>
                          Are you sure you want to delete the
                          <span className="font-bold underline">
                            {' '}
                            {data.data?.title}{' '}
                          </span>
                          board? This action will remove all columns and tasks
                          and cannot be reversed.
                        </>
                      ) : (
                        <>
                          Are you sure you want to delete the{' '}
                          <span className="font-bold underline">
                            {data.data?.title}
                          </span>
                          ’ task and its subtasks? This action cannot be
                          reversed.
                        </>
                      )}
                    </Dialog.Description>
                    <div className="flex justify-between w-full mt-6 h-fit gap-x-4 mt-">
                      <Button
                        type="submit"
                        className="py-2 flex text-sm justify-center w-full bg-red hover:bg-red(hover)"
                      >
                        {mutation.isLoading ? <Loading /> : <span>Delete</span>}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        type="submit"
                        className="flex justify-center w-full py-2 text-sm bg-white text-main-purple hover:bg-main-purple/25"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteModal;
