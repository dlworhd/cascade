import { UserProfile } from "@/app/model/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    userProfile: Partial<UserProfile> | null;
    setProfile: (userProfile: Partial<UserProfile> | null) => void;
    clearProfile: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userProfile: null,
            setProfile: (userProfile) => set({ userProfile }),
            clearProfile: () => set({ userProfile: null }),
        }),
        {
            name: "user-profile-storage", // localStorage key
        }
    )
);
