import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userSliceReducer from "../features/usersSlice";

export const store = configureStore({
  reducer: {
    users: userSliceReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
