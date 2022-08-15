import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FC } from 'react';
import { trpc } from '~/utils/trpc';
import useAppStore from '~/data/useStore';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TransitionChild from './Transition';

const ViewTaskModal: FC<{
  closeModal: () => void;
  isOpen: boolean;
}> = ({ closeModal, isOpen }) => {
  const { viewTask, selectedBoard } = useAppStore();
  const task = trpc.useQuery(['task.byId', { id: viewTask }]);
  const board = trpc.useQuery(['board.byId', { id: selectedBoard }]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild>
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  {task.isLoading ? (
                    <div className="text-xl animate-pulse">Loading</div>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                      >
                        <span className="w-full">{task.data?.title}</span>
                        <button aria-roledescription="Options">
                          <BsThreeDotsVertical />
                        </button>
                      </Dialog.Title>
                      <div className="mt-4">
                        <p>{task.data?.description}</p>
                        <div className="mt-3 ">
                          <p>
                            Subtasks(
                            {`${
                              task.data?.Sub_Task.filter((_) => _.complete)
                                .length
                            } of ${task.data?.Sub_Task.length}`}
                            )
                          </p>
                          <ul className="flex flex-col mt-1 gap-y-2">
                            {task.data?.Sub_Task.map(
                              ({ id, complete, title }) => {
                                return (
                                  <li
                                    key={id}
                                    className="flex items-center p-2 mt-1 text-sm rounded gap-x-2 ring-2 ring-black/40"
                                  >
                                    <input
                                      defaultChecked={complete || undefined}
                                      type="checkbox"
                                      name={id}
                                      id={id}
                                    />
                                    <label htmlFor={id} className="">
                                      {complete ? (
                                        <s className="opacity-70">{title}</s>
                                      ) : (
                                        <span>{title}</span>
                                      )}
                                    </label>
                                  </li>
                                );
                              },
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p>Status</p>
                        <select
                          className="w-full p-2 mt-1 rounded ring-1"
                          defaultValue={task.data?.column_id}
                        >
                          {board.data?.Column.map(({ id, title }) => {
                            return (
                              <option key={id} value={id}>
                                {title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewTaskModal;
