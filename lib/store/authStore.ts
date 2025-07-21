import { create } from "zustand";
import { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setIsAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

export const useAuth = useAuthStore;