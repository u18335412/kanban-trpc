import create, { useStore } from 'zustand';
import { Board } from '@prisma/client';

interface AppStore {
  selectedBoard: string;
  setSelectedBoard: (boardId: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  selectedBoard: '',
  setSelectedBoard: (boardId) => set({ selectedBoard: boardId }),
}));

export default useAppStore;
