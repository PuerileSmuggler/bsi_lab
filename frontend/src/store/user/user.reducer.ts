import { createReducer } from "@reduxjs/toolkit";
import {
  clearLoginUserError,
  getAllPasswordsSuccess,
  loginUserError,
  loginUserSuccess,
  logoutUser,
  refreshTokenError,
  refreshTokenSuccess,
} from "./user.actions";
import { IUserState } from "./user.interface";

const initState: IUserState = {
  auth: false,
  passwords: { count: 0, passwords: [] },
  errors: {},
};

export const userReducer = createReducer(initState, (builder) =>
  builder
    .addCase(loginUserSuccess, (state) => {
      state.auth = true;
    })
    .addCase(refreshTokenSuccess, (state) => {
      state.auth = true;
    })
    .addCase(refreshTokenError, (state) => {
      state.auth = false;
    })
    .addCase(getAllPasswordsSuccess, (state, action) => {
      state.passwords = action.payload;
    })
    .addCase(logoutUser, (state) => {
      state.auth = false;
    })
    .addCase(loginUserError, (state, action) => {
      state.errors["login"] = action.payload;
    })
    .addCase(clearLoginUserError, (state) => {
      state.errors["login"] = undefined;
    }),
);
