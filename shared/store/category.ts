import { create } from "zustand";

interface State {
    activeId: number;
    setActiveId: (activeDd: number) => void;
}

export const useCategoryStore = create<State>((set) => ({
    activeId: 1,
    setActiveId: (activeId: number) => set({ activeId }),
}));

