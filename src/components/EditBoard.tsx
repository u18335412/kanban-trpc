import { FC, FormEvent, useEffect } from 'react';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineClose } from 'react-icons/ai';
import { trpc } from '~/utils/trpc';
import useAppStore from '~/data/useStore';

interface EditBoardModalProps {
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

const EditBoardModal: FC<EditBoardModalProps> = ({ isOpen, closeModal }) => {
  const { viewTask } = useAppStore();
  const mutate = trpc.useMutation(['board.edit']);
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
        id: viewTask,
        data: {
          title: data.title,
          columns: data.columns,
        },
      },
      {
        onSuccess: () => {
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

  return <></>;
};

export default EditBoardModal;
