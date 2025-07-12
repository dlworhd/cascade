import { UserProfile } from "@/app/model/User";
import { create } from "zustand";

interface SidebarState {
    setUserProfile: (p: UserProfile) => void;
    isCollapse: boolean;
    toggleCollapse: () => void;
    width: number;
    setWidth: (w: number) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    setUserProfile: (p: UserProfile) => set({userProfile: p}),
    isCollapse: false,
    toggleCollapse: () => set((state) => ({isCollapse: !state.isCollapse})),
    width: 80,
    setWidth: (w) => set({ width: w }),
}));
