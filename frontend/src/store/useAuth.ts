import { create } from "zustand";

interface User {
  firstName: string;
  lastName: string;
  role: "CASHIER" | "SUPER_ADMIN";
}

interface State {
  user: User | null;
}

interface Action {
  setAuth: (
    firstName: string,
    lastName: string,
    role: "CASHIER" | "SUPER_ADMIN",
    // token: string,
  ) => Promise<void>;
}

export const useAuth = create<State & Action>((set) => ({
  user: null,
  setAuth: async (firstName, lastName, role) =>
    set({ user: { firstName, lastName, role } }),
}));
