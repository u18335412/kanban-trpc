import { Transition, Dialog } from '@headlessui/react';
import { FC, FormEvent, Fragment, useEffect } from 'react';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { trpc } from '~/utils/trpc';
import TransitionChild from './Transition';
import InputLabel from './InputLabel';
import Button from './Button';
import useTheme from '~/data/useTheme';
import Input from './Input';
import { ImSpinner8 } from 'react-icons/im';
import useAppStore from '~/data/useStore';

interface NewBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const schema = zod.object({
  title: zod.string().min(1, { message: 'Required' }),
  columns: zod
    .array(
      zod.object({
        title: zod.string().min(1, { message: 'Required' }),
      }),
    )
    .optional(),
});

const NewBoardModal: FC<NewBoardModalProps> = ({ isOpen, closeModal }) => {
  const { theme } = useTheme();
  const { toast } = useAppStore();
  const mutate = trpc.useMutation(['board.add']);
  const utils = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      columns: [{ title: 'Todo' }, { title: 'Doing' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
    rules: { minLength: 1 },
  });

  const handleFormSubmit = (data: FieldValues) => {
    mutate.mutate(
      {
        title: data.title,
        columns: data.columns,
      },
      {
        onSuccess: () => {
          reset();
          toast.success('Board created successfully.');
          utils.invalidateQueries(['board.all']);
          closeModal();
        },
        onError: () => {
          toast.error('An error has occured while adding board.');
        },
      },
    );
  };

  const addColumn = (e: FormEvent) => {
    e.preventDefault();
    append([{ title: '' }]);
  };

  useEffect(() => {
    remove();
    reset();
  }, [remove, reset, isOpen]);

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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-dark-grey dark:text-white rounded-2xl">
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6">
                    Add New Board
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="[&>*]:flex [&>*]:flex-col [&>*]:gap-1 flex flex-col gap-y-6 mt-6">
                      <div>
                        <InputLabel
                          label="Board Name"
                          htmlFor="title"
                          className="mb-2"
                        ></InputLabel>
                        <Input
                          id="title"
                          register={register}
                          errors={errors}
                          placeholder="e.g. Web Design"
                        />
                      </div>
                      <div className="">
                        <InputLabel
                          label="Board Columns"
                          htmlFor="title"
                        ></InputLabel>
                        <ul className="flex flex-col mt-2 gap-y-3">
                          {fields.map(({ id }, index) => {
                            return (
                              <li
                                key={id}
                                className="flex items-center justify-between gap-x-2"
                              >
                                <Input
                                  id={`columns.${index}.title`}
                                  register={register}
                                  errors={errors}
                                />
                                <button
                                  arial-label="Remove Column"
                                  onClick={() => remove(index)}
                                >
                                  <AiOutlineClose className="" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="mt-3">
                          <Button
                            icon={<AiOutlinePlus />}
                            onClick={(e) => addColumn(e)}
                            className="flex justify-center w-full p-2 py-2 rounded-full text-main-purple dark:bg-white ring-1 ring-black"
                          >
                            Add New Column
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="flex justify-center p-2 py-2 text-white bg-indigo-500 rounded-full cursor-pointer"
                        >
                          {mutate.isLoading ? (
                            <ImSpinner8 className="w-5 h-5 white animate-spin" />
                          ) : (
                            <>Create Board</>
                          )}
                        </Button>
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
