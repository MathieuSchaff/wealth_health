import create from "zustand";
import { defaultData } from "./components/Table/fakeData";
import { FormatedDataType } from "./components/Table/fakeData";
export const useUsersStore = create<{
  user: FormatedDataType | null;
  users: FormatedDataType[];
  addOneUser: (user: FormatedDataType) => void;
}>((set) => ({
  users: defaultData,
  user: null,
  addOneUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));
