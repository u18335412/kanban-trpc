import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FC, useState, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import useAppStore from '~/data/useStore';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TransitionChild from './Transition';
import StatusSelect, { StatusItemsInterface } from './StatusSelect';
import useTheme from '~/data/useTheme';
import DropDown from './DropDown';
import { ModalType } from './ModalManager';
import InputLabel from './InputLabel';
import { ImSpinner8 } from 'react-icons/im';
import clsx from 'clsx';

const ViewTaskModal: FC<{
  closeModal: () => void;
  isOpen: boolean;
}> = ({ closeModal, isOpen }) => {
  const { viewTask, selectedBoard, setSelectedModal, setDelete } =
    useAppStore();
  const { theme } = useTheme();
  const task = trpc.useQuery(['task.byId', { id: viewTask }]);
  const board = trpc.useQuery(['board.byId', { id: selectedBoard }]);
  const subTaskMutation = trpc.useMutation(['task.toggleSubtaskCompletion']);
  const [selected, setSelected] = useState<StatusItemsInterface | undefined>({
    value: board?.data?.Column[0]?.id || '',
    text: board?.data?.Column[0]?.title || '',
  });

  const DropDownItems = [
    {
      text: 'Edit Task',
      action: () => setSelectedModal(ModalType.EditTask),
    },
    {
      text: 'Delete Task',
      action: () => {
        setDelete('task');
        setSelectedModal(ModalType.DeleteModal);
      },
      text_color: ' text-red',
    },
  ];

  const handleToggleSubtaskCompletion = (id: string, value: boolean) => {
    subTaskMutation.mutate(
      {
        id,
        data: {
          is_complete: value,
        },
      },
      {
        onSuccess: () => {
          task.refetch();
        },
      },
    );
  };

  useEffect(() => {
    if (board?.data?.Column[0]) {
      setSelected({
        value: board?.data?.Column[0]?.id,
        text: board?.data?.Column[0]?.title,
      });
    }
  }, [board?.data?.Column]);

  return (
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
              <Dialog.Panel className="w-full max-w-[28rem] p-6  text-left align-middle transition-all transform dark:bg-dark-grey bg-white shadow-xl rounded-md dark:text-white">
                {task?.isLoading ? (
                  <div className="grid h-full place-content-center">
                    <ImSpinner8 className="w-5 h-5 white animate-spin" />
                  </div>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between text-lg font-bold leading-6 text-gray-900"
                    >
                      <span className="w-full">{task?.data?.title}</span>
                      <div>
                        <DropDown
                          className=" -right-[500%] mt-5"
                          icon={<BsThreeDotsVertical />}
                          items={DropDownItems}
                        />
                      </div>
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-sm font-medium text-medium-grey">
                        {task?.data?.description}
                      </p>
                      <div className="mt-6">
                        <InputLabel
                          label={`Subtasks (
                              ${
                                task?.data?.Sub_Task.filter((_) => _.complete)
                                  .length
                              } of ${task?.data?.Sub_Task.length}
                              )`}
                          htmlFor=""
                        />
                        <ul className="flex flex-col mt-2 gap-y-2">
                          {task?.data?.Sub_Task.map(
                            ({ id, complete, title }) => {
                              return (
                                <li
                                  key={id}
                                  className="p-3 mt-1 text-xs font-bold text-black rounded hover:dark:bg-main-purple/25 hover:bg-main-purple/25 dark:text-white bg-light-grey dark:bg-very-dark-grey"
                                >
                                  <label className="flex items-center w-full cursor-pointer gap-x-4 ">
                                    <input
                                      onChange={(e) => {
                                        handleToggleSubtaskCompletion(
                                          id,
                                          e.target.checked,
                                        );
                                      }}
                                      defaultChecked={complete || undefined}
                                      type="checkbox"
                                      id={id}
                                      name={id}
                                      className="w-4 h-4 cursor-pointer accent-main-purple"
                                    />
                                    <span
                                      className={clsx({
                                        'line-through decoration-black/50 dark:decoration-white/50 mix-blend-normal text-black/50 dark:text-white/50':
                                          complete,
                                      })}
                                    >
                                      {title}
                                    </span>
                                  </label>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <InputLabel label="Current Status" htmlFor="" />
                      <div className="mt-2">
                        <StatusSelect
                          selected={selected}
                          setSelected={setSelected}
                          statusItems={board.data?.Column.map(
                            ({ id, title }) => ({ value: id, text: title }),
                          )}
                        />
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
  );
};

export default ViewTaskModal;
