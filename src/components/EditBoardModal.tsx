import { Transition, Dialog } from '@headlessui/react';
import { FC, FormEvent, Fragment, useEffect, useState } from 'react';
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

interface EditBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const schema = zod.object({
  title: zod.string().min(1, { message: 'Required' }),
  columns: zod
    .array(
      zod.object({
        id: zod.string(),
        title: zod.string().min(1, { message: 'Required' }),
      }),
    )
    .optional(),
});

const EditBoardModal: FC<EditBoardModalProps> = ({ isOpen, closeModal }) => {
  const { toast, selectedBoard } = useAppStore();
  const { data } = trpc.useQuery(['board.byId', { id: selectedBoard }]);
  const { theme } = useTheme();
  const [toRemoveColumns, setToRemoveColumns] = useState<
    { title: string; id: string }[]
  >([]);
  const mutate = trpc.useMutation(['board.edit']);
  const utils = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const handleFormSubmit = (data: FieldValues) => {
    mutate.mutate(
      {
        id: selectedBoard,
        data: {
          title: data.title,
          updateOrNewcolumns: data.columns,
          removeColumns: toRemoveColumns,
        },
      },
      {
        onSuccess: (response) => {
          reset();
          toast.success('Board udpated successfully.');
          utils.invalidateQueries(['board.getColumns', { id: selectedBoard }]);
          utils.invalidateQueries(['board.byId', { id: selectedBoard }]);
          utils.invalidateQueries(['board.all']);
          closeModal();
        },
        onError: () => {
          toast.error('An error has occured while updating board.');
        },
      },
    );
  };

  const addColumn = (e: FormEvent) => {
    e.preventDefault();
    append([{ title: '', id: 'new_column' }]);
  };

  useEffect(() => {
    setToRemoveColumns([]);
    reset();
    remove();
    data?.Column.forEach(({ title, id }) => append({ title, id: id }));
  }, [append, data?.Column, remove, reset, isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-100 "
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
                    Edit Board
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
                          value={data?.title || ''}
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
                          {fields
                            .map((field, idx) => ({
                              id: field.id,
                              column_id: data?.Column[idx]?.id,
                            }))
                            .map(({ id, column_id }, index) => {
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
                                    onClick={() => {
                                      remove(index);
                                      if (
                                        data &&
                                        data?.Column.filter(
                                          (column) => column.id === column_id,
                                        ).length > 0
                                      )
                                        setToRemoveColumns((prev) => [
                                          ...prev,
                                          data?.Column[index] || {
                                            title: '',
                                            id: '',
                                          },
                                        ]);
                                    }}
                                  >
                                    <AiOutlineClose className="" />
                                    <Input
                                      className="absolute hidden"
                                      id={`columns.${index}.id`}
                                      register={register}
                                      errors={errors}
                                    />
                                  </button>
                                </li>
                              );
                            })}
                        </ul>
                        <div className="mt-3">
                          <Button
                            icon={<AiOutlinePlus />}
                            onClick={(e) => addColumn(e)}
                            className="flex justify-center w-full p-2 py-2  rounded-full text-main-purple bg-white"
                          >
                            Add New Column
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="flex justify-center p-2 py-2 text-white bg-indigo-500 rounded-full cursor-pointer bg-main-purple"
                        >
                          {mutate.isLoading ? (
                            <ImSpinner8 className="w-5 h-5 white animate-spin" />
                          ) : (
                            <>Save Changes</>
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

export default EditBoardModal;
