import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

import { IUser } from "interfaces";
import { UserRole } from "enums";

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: {
    userRole: UserRole.Admin,
    email: "email@nure.ua",
    name: "Ihor",
    surname: "Kravtsov",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    resetUser(state) {
      state.user = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.user = null;
  //     })
  //     .addCase(register.fulfilled, (state) => {
  //       state.user = {} as IUser;
  //     });
  // },
});

export const { setUser, resetUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
