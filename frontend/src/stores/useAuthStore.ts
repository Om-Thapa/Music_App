import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
    isAdmin: boolean | null;
    isLoading: boolean;
    error: string | null;

    checkAdminStatus: () => Promise<void>;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async() => {
        try {
            const response = await axiosInstance.get("/admin/check");
            set({ isAdmin: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        }
    },
    reset: () => {
        set({ isAdmin: false, isLoading: false, error: null });
    }
}))