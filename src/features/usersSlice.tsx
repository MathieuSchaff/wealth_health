import { RootState } from "../store/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: Date;
  startDate: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}
const initialState: IUser[] = [];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state = state.filter((user) => {
        return user.id !== action.payload;
      });
    },
  },
});
export default usersSlice.reducer;
export const { addUser, deleteUser } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.find((user) => user.id === userId);
