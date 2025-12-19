import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthStore } from "@/interfaces/auth.interfaces";
export const cookieKey = "AUTH_TOKEN_STAFFWATCH";

export const useAuthStore = create(
    persist<IAuthStore>(
        (set, get) => ({
            setAccount: (obj) => set({ account: obj }),
            setAccess: (obj) => {
                set({ access: obj.access, refresh: obj.refresh });
            },
            setOrganization: (obj) => {
                set({ organization: obj });
            },
        }),
        {
            name: "sw-auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
