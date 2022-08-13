import create, { useStore } from 'zustand';
import { Board } from '@prisma/client';
import { ModalType } from '~/components/ModalManager';

interface AppStore {
  selectedBoard: string;
  viewTask: string;
  selectedModal: ModalType;
  setSelectedModal: (modal: ModalType) => void;
  setViewTask: (taskId: string) => void;
  setSelectedBoard: (boardId: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  selectedBoard: '',
  viewTask: '',
  selectedModal: ModalType.None,
  setSelectedModal: (modal: ModalType) =>
    set((state) => ({ ...state, selectedModal: modal })),
  setViewTask: (taskId: string) =>
    set((state) => ({ ...state, viewTask: taskId })),
  setSelectedBoard: (boardId: string) =>
    set((state) => ({ ...state, selectedBoard: boardId })),
}));

export default useAppStore;
