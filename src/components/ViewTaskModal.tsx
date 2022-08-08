import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FC } from 'react';
import { trpc } from '~/utils/trpc';
import useAppStore from '~/data/useStore';
import { useEffect } from 'react';

const ViewTaskModal: FC<{
  closeModal: () => void;
  isOpen: boolean;
  taskId: string;
}> = ({ closeModal, isOpen, taskId }) => {
  const { viewTask } = useAppStore();
  const task = trpc.useQuery(['task.byId', { id: viewTask }]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  {task.isLoading ? (
                    <div className="text-xl animate-pulse">Loading</div>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {task.data?.title}
                      </Dialog.Title>
                      <Dialog.Description className="mt-4">
                        <p>{task.data?.description}</p>
                        <div className="flex flex-col mt-3 gap-y-2">
                          {task.data?.Sub_Task.map((sub_task) => {
                            return (
                              <div
                                key={sub_task.id}
                                className="flex items-center p-2 mt-1 text-sm rounded gap-x-2 ring-2 ring-black/40"
                              >
                                <input
                                  defaultChecked={sub_task.complete}
                                  type="checkbox"
                                  name={sub_task.id}
                                  id={sub_task.id}
                                />
                                <label htmlFor={sub_task.id} className="">
                                  {sub_task.complete ? (
                                    <s className="opacity-70">
                                      {sub_task.title}
                                    </s>
                                  ) : (
                                    <span>{sub_task.title}</span>
                                  )}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </Dialog.Description>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewTaskModal;
