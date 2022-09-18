import create from 'zustand';
import { ModalType } from '~/components/ModalManager';
import { toast } from 'react-toastify';

interface AppStore {
  toast: any;
  deleteType: 'board' | 'task';
  selectedBoard: string;
  viewTask: string;
  selectedModal: ModalType;
  setSelectedModal: (modal: ModalType) => void;
  setViewTask: (taskId: string) => void;
  setSelectedBoard: (boardId: string) => void;
  setDelete: (type: 'board' | 'task') => void;
}

const useAppStore = create<AppStore>((set) => ({
  toast: toast,
  deleteType: 'board',
  selectedBoard: '',
  viewTask: '',
  selectedModal: ModalType.None,
  setSelectedModal: (modal: ModalType) =>
    set((state) => ({ ...state, selectedModal: modal })),
  setViewTask: (taskId: string) =>
    set((state) => ({ ...state, viewTask: taskId })),
  setSelectedBoard: (boardId: string) =>
    set((state) => ({ ...state, selectedBoard: boardId })),
  setDelete: (type: 'board' | 'task') =>
    set((state) => ({ ...state, deleteType: type })),
}));

export default useAppStore;
