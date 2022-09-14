import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, FC, useState, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import TransitionChild from './Transition';
import useAppStore from '~/data/useStore';
import InputLabel from './InputLabel';
import Input from './Input';
import Button from './Button';
import StatusSelect, { StatusItemsInterface } from './StatusSelect';
import useTheme from '~/data/useTheme';
import { ImSpinner8 } from 'react-icons/im';

const schema = zod.object({
  title: zod.string().min(1, { message: 'Required' }),
  description: zod.string(),
  sub_tasks: zod.array(
    zod.object({
      title: zod.string().min(1, { message: 'Required' }),
    }),
  ),
});

const NewTaskModal: FC<{
  closeModal: () => void;
  isOpen: boolean;
}> = ({ closeModal, isOpen }) => {
  const { theme } = useTheme();
  const utils = trpc.useContext();
  const { selectedBoard } = useAppStore();
  const { isLoading, data } = trpc.useQuery([
    'board.getColumns',
    { id: selectedBoard },
  ]);
  const [selected, setSelected] = useState<StatusItemsInterface | undefined>({
    value: data?.Column[0]?.id || '',
    text: data?.Column[0]?.title || '',
  });
  const mutation = trpc.useMutation(['task.add']);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sub_tasks',
    rules: { minLength: 1 },
  });

  const handleFormSubmit = (validatedData: FieldValues) => {
    mutation.mutate(
      {
        title: validatedData.title,
        description: validatedData.description,
        column_id: validatedData.column_id,
        sub_tasks: validatedData.sub_tasks,
      },
      {
        onSuccess: () => {
          utils.invalidateQueries(['board.byId', { id: selectedBoard }]);
          closeModal();
        },
      },
    );
  };

  useEffect(() => {
    if (data?.Column[0]) {
      setSelected({
        value: data?.Column[0]?.id,
        text: data?.Column[0]?.title,
      });
    }
  }, [data?.Column]);

  const addSubTask = (e: React.FormEvent) => {
    e.preventDefault();
    append({ title: '' });
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
            <div className="flex items-center justify-center min-h-full text-center dark:text-white">
              <TransitionChild>
                <Dialog.Panel className="w-full max-w-[30rem] p-8  text-left min-w-max align-middle transition-all dark:bg-dark-grey transform bg-white shadow-xl rounded-md">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Add New Task
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="mt-6"
                  >
                    <div className="[&>*]:flex [&>*]:flex-col [&>*]:gap-1 flex flex-col gap-y-6">
                      <div>
                        <InputLabel label="Title" htmlFor="title" />
                        <Input
                          errors={errors}
                          id="title"
                          register={register}
                          placeholder="e.g. Take coffee break"
                        />
                      </div>
                      <div>
                        <InputLabel label="Description" htmlFor="description" />
                        <Input
                          errors={errors}
                          type="textarea"
                          id="description"
                          register={register}
                          placeholder="e.g. It's always good to take a break, this 15 minute break will recharge the batteries a little."
                        />
                      </div>
                      <div className="flex">
                        <InputLabel label="Subtasks" htmlFor="Subtasks" />
                        <ul className="flex flex-col mt-2 gap-y-2">
                          {fields.map(({ id }, index) => {
                            return (
                              <li
                                key={id}
                                className="flex items-center justify-between gap-x-2"
                              >
                                <Input
                                  errors={errors}
                                  id={`sub_tasks.${index}.title`}
                                  register={register}
                                  placeholder=""
                                />
                                <button
                                  arial-label="Remove task"
                                  onClick={() => remove(index)}
                                  className="group"
                                >
                                  <AiOutlineClose className="transition-all bg-white group-hover:text-red" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="mt-4">
                          <Button
                            onClick={addSubTask}
                            icon={<AiOutlinePlus />}
                            className="flex justify-center w-full py-2 bg-white text-main-purple hover:bg-main-purple/25"
                          >
                            Add New Subtask
                          </Button>
                        </div>
                        <div className="mt-6">
                          <InputLabel label="Status" htmlFor="Subtasks" />
                          <div className="mt-2">
                            <StatusSelect
                              statusItems={data?.Column.map(
                                ({ id, title }) => ({
                                  value: id,
                                  text: title,
                                }),
                              )}
                              selected={selected}
                              setSelected={setSelected}
                            />
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            type="submit"
                            className="flex justify-center w-full py-2"
                          >
                            {mutation.isLoading ? (
                              <ImSpinner8 className="w-5 h-5 white animate-spin" />
                            ) : (
                              <>Create Task</>
                            )}
                          </Button>
                        </div>
                      </div>
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

export default NewTaskModal;
