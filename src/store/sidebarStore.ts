import { create } from "zustand";

interface SidebarState {
    isCollapse: boolean;
    toggleCollapse: () => void;
    width: number;
    setWidth: (w: number) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isCollapse: false,
    toggleCollapse: () => set((state) => ({isCollapse: !state.isCollapse})),
    width: 80,
    setWidth: (w) => set({ width: w }),
}));
