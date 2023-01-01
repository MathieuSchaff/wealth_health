import create from "zustand";

import type { FormSchema } from "./components/ZodForm.tsx/ZodForm";
export const useUsersStore = create<{
  user: FormSchema | null;
  users: FormSchema[];
  addOneUser: (user: FormSchema) => void;
}>((set) => ({
  users: [],
  user: null,
  addOneUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));
