import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectStoreProps {
  id_proyecto: number;
  onAddProject: (id: number) => void;
  onGetProject: () => number;
  onResetProject: () => void;
}

export const useProjectStore = create<ProjectStoreProps>()(
  persist<ProjectStoreProps>(
    (set, get) => ({
      id_proyecto: 0,
      onAddProject: (id: number) => set({ id_proyecto: id }),
      onGetProject: () => get().id_proyecto,
      onResetProject: () => set({ id_proyecto: 0 }),
    }),
    {
      name: 'project-store',
      getStorage: () => sessionStorage,
    }
  )
);
