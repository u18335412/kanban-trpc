import { Transition, Dialog } from '@headlessui/react';
import { FC, FormEvent, Fragment, useEffect } from 'react';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineClose } from 'react-icons/ai';
import { trpc } from '~/utils/trpc';
import TransitionChild from './Transition';

interface NewBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const schema = zod.object({
  title: zod.string().min(1, { message: 'Required' }),
  columns: zod.array(
    zod.object({
      title: zod.string().min(1, { message: 'Required' }),
    }),
  ),
});

const NewBoardModal: FC<NewBoardModalProps> = ({ isOpen, closeModal }) => {
  const mutate = trpc.useMutation(['board.add']);
  const utils = trpc.useContext();
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sub_tasks',
    rules: { minLength: 1 },
  });

  const handleFormSubmit = (data: FieldValues) => {
    mutate.mutate(
      {
        title: data.title,
        columns: data.columns,
      },
      {
        onSuccess: (res) => {
          utils.invalidateQueries(['board.all']);
          closeModal();
        },
      },
    );
  };

  const addColumn = (e: FormEvent) => {
    e.preventDefault();
    append([{ title: '' }]);
  };

  useEffect(() => {
    append([{ title: '' }, { title: '' }]);
  }, [append]);

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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild>
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Board
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="[&>*]:flex [&>*]:flex-col [&>*]:gap-1 flex flex-col gap-y-2 mt-2">
                      <div>
                        <label htmlFor="title" className="">
                          Board Name
                        </label>
                        <input
                          {...register('title', { required: true })}
                          type="text"
                          name="title"
                          className="p-2 rounded ring-1 ring-black/50"
                          placeholder="e.g Web Design"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="title" className="">
                          Board Columns
                        </label>
                        {fields.map(({ id }, index) => {
                          return (
                            <li
                              key={id}
                              className="flex items-center justify-between gap-x-2"
                            >
                              <input
                                className="w-full p-2 rounded ring-black/50 ring-1"
                                type="text"
                                {...register(`columns.${index}.title`, {
                                  required: true,
                                })}
                              />
                              <button
                                arial-label="Remove Column"
                                onClick={() => remove(index)}
                              >
                                <AiOutlineClose className="bg-white" />
                              </button>
                            </li>
                          );
                        })}
                        <div className="mt-2">
                          <button
                            onClick={(e) => addColumn(e)}
                            className="w-full p-2 rounded-full ring-1 ring-black"
                          >
                            Add Column
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <input
                          type="submit"
                          value="Create Board"
                          className="p-2 text-white bg-indigo-500 rounded-full cursor-pointer"
                        />
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

export default NewBoardModal;
