import create, { useStore } from 'zustand';
import { Board } from '@prisma/client';

interface AppStore {
  selectedBoard: string;
  viewTask: string;
  setViewTask: (taskId: string) => void;
  setSelectedBoard: (boardId: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  selectedBoard: '',
  viewTask: '',
  setViewTask: (taskId: string) => set({ viewTask: taskId }),
  setSelectedBoard: (boardId: string) => set({ selectedBoard: boardId }),
}));

export default useAppStore;
