import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, FC } from 'react';
import { trpc } from '~/utils/trpc';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import useAppStore from '~/data/useStore';

interface SubTask {
  title: string;
  complete: boolean;
}

interface FormData {
  title: string;
  description: string;
}

const schema = zod.object({
  title: zod.string().min(1, { message: 'Rquired' }),
  description: zod.string(),
  column_id: zod.string().min(1, { message: 'Rquired' }),
  sub_tasks: zod.array(
    zod.object({
      title: zod.string().min(1, { message: 'Rquired' }),
    }),
  ),
});

const NewTaskModal: FC<{
  closeModal: () => void;
  isOpen: boolean;
}> = ({ closeModal, isOpen }) => {
  const utils = trpc.useContext();
  const { selectedBoard } = useAppStore();
  const { isLoading, data } = trpc.useQuery([
    'board.getColumns',
    { id: selectedBoard },
  ]);
  const mutation = trpc.useMutation(['task.add']);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sub_tasks',
    rules: { minLength: 1 },
  });

  const handleFormSubmit = (validatedData: FieldValues) => {
    console.log('Task', validatedData);
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

  const addSubTask = (e: React.FormEvent) => {
    e.preventDefault();
    append({ title: '' });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 "
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Task
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="[&>*]:flex [&>*]:flex-col [&>*]:gap-1 flex flex-col gap-y-2">
                      <div>
                        <label htmlFor="title" className="">
                          Title
                        </label>
                        <input
                          {...register('title', { required: true })}
                          type="text"
                          name="title"
                          className="p-2 rounded ring-1 ring-black/50"
                          placeholder="e.g Take coffee break"
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="">
                          Description
                        </label>
                        <textarea
                          {...register('description', { required: true })}
                          rows={4}
                          name="description"
                          className="p-2 rounded ring-1 ring-black/50"
                          placeholder="e.g It's always good to take a break, this 15 minute break will recharge the batteries a little."
                        />
                      </div>
                      <div className="flex">
                        <p className="">Subtasks</p>
                        <div className="flex flex-col gap-y-2 ">
                          {fields.map(({ id }, index) => {
                            return (
                              <div
                                key={id}
                                className="flex items-center justify-between gap-x-2"
                              >
                                <input
                                  className="w-full p-2 rounded ring-black/50 ring-1"
                                  type="text"
                                  {...register(`sub_tasks.${index}.title`, {
                                    required: true,
                                  })}
                                />
                                <button
                                  arial-label="Remove task"
                                  onClick={() => remove(index)}
                                >
                                  <AiOutlineClose className="bg-white" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={(e) => addSubTask(e)}
                            className="flex items-center justify-center w-full p-2 text-indigo-500 bg-white rounded-full ring-2 ring-black/50 gap-x-2"
                          >
                            <AiOutlinePlus /> Add New Sub
                          </button>
                        </div>
                        <div className="mt-4">
                          <p>Status</p>
                          <select
                            {...register('column_id', { required: true })}
                            className={`w-full p-2 mt-1 ring-2 ${
                              isLoading ? 'bg-gray-300 animate-pulse h-10' : ''
                            }`}
                          >
                            <option value="">select status</option>
                            {data?.Column.map(({ id, title }) => {
                              return (
                                <option key={id} value={id.toString()}>
                                  {title}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="mt-4">
                          <input
                            type="submit"
                            value="Create Task"
                            className="flex items-center justify-center w-full p-2 text-white bg-indigo-500 rounded-full ring-2 gap-x-2"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewTaskModal;
