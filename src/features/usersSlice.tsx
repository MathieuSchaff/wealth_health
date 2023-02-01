import { RootState } from "../store/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IUser {
  dateOfBirth: string;
  startDate: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
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
  },
});
export default usersSlice.reducer;
export const { addUser } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users;
