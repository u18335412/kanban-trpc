import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FC } from 'react';
import { trpc } from '~/utils/trpc';
import useAppStore from '~/data/useStore';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TransitionChild from './Transition';
import StatusSelect from './StatusSelect';
import useTheme from '~/data/useTheme';

const ViewTaskModal: FC<{
  closeModal: () => void;
  isOpen: boolean;
}> = ({ closeModal, isOpen }) => {
  const { viewTask, selectedBoard } = useAppStore();
  const { theme } = useTheme();
  const task = trpc.useQuery(['task.byId', { id: viewTask }]);
  const board = trpc.useQuery(['board.byId', { id: selectedBoard }]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-10 ${theme}`}
          onClose={closeModal}
        >
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild>
                <Dialog.Panel className="w-full max-w-[28rem] p-6  text-left align-middle transition-all transform dark:bg-dark-grey bg-white shadow-xl rounded-2xl dark:text-white">
                  {task.isLoading ? (
                    <div className="text-xl animate-pulse">Loading</div>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="flex items-center justify-between text-lg font-bold leading-6 text-gray-900"
                      >
                        <span className="w-full">{task.data?.title}</span>
                        <button aria-roledescription="Options">
                          <BsThreeDotsVertical />
                        </button>
                      </Dialog.Title>
                      <div className="mt-6">
                        <p className="text-sm font-medium text-medium-grey">
                          {task.data?.description}
                        </p>
                        <div className="mt-6">
                          <p className="text-xs font-bold text-medium-grey">
                            Subtasks (
                            {`${
                              task.data?.Sub_Task.filter((_) => _.complete)
                                .length
                            } of ${task.data?.Sub_Task.length}`}
                            )
                          </p>
                          <ul className="flex flex-col mt-4 gap-y-2">
                            {task.data?.Sub_Task.map(
                              ({ id, complete, title }) => {
                                return (
                                  <li
                                    key={id}
                                    className="flex items-center p-3 mt-1 text-xs font-bold text-black rounded hover:dark:bg-main-purple/25 hover:bg-main-purple/25 dark:text-white bg-light-grey dark:bg-very-dark-grey opac text gap-x-4"
                                  >
                                    <input
                                      checked={complete || undefined}
                                      type="checkbox"
                                      name={id}
                                      id={id}
                                      className="w-4 h-4 pointer-events-none accent-main-purple "
                                    />
                                    <label
                                      htmlFor={id}
                                      className="pointer-events-none"
                                    >
                                      {complete ? (
                                        <s className="text-black/50 dark:text-white/50">
                                          {title}
                                        </s>
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
                      <div className="mt-6">
                        <p className="text-xs font-bold text-medium-grey">
                          Current Status
                        </p>
                        {/* <select
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
                        </select> */}
                        <div className="mt-2">
                          <StatusSelect statusItems={board.data?.Column} />
                        </div>
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
