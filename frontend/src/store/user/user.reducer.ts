import { createReducer } from "@reduxjs/toolkit";
import {
  clearIpBlockSuccess,
  clearLoginUserError,
  clearPassword,
  getAllPasswordsSuccess,
  getAllSharedPasswordsSuccess,
  getPasswordByIdSuccess,
  getSharingPasswordsSuccess,
  loginUserError,
  loginUserSuccess,
  logoutUser,
  refreshToken,
  refreshTokenError,
  refreshTokenSuccess,
  setIpBlock,
} from "./user.actions";
import { IUserState } from "./user.interface";

const initState: IUserState = {
  auth: false,
  passwords: { count: 0, passwords: [] },
  sharedPasswords: { count: 0, passwords: [] },
  sharingPasswords: { count: 0, passwords: [] },
  errors: {},
  password: undefined,
  ipBlocked: false,
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
    .addCase(getAllSharedPasswordsSuccess, (state, action) => {
      state.sharedPasswords = action.payload;
    })
    .addCase(getSharingPasswordsSuccess, (state, action) => {
      state.sharingPasswords = action.payload;
    })
    .addCase(logoutUser, (state) => {
      state.auth = false;
    })
    .addCase(loginUserError, (state, action) => {
      state.errors["login"] = action.payload;
    })
    .addCase(clearLoginUserError, (state) => {
      state.errors["login"] = undefined;
    })
    .addCase(getPasswordByIdSuccess, (state, action) => {
      state.password = action.payload;
    })
    .addCase(clearPassword, (state) => {
      state.password = undefined;
    })
    .addCase(setIpBlock, (state) => {
      state.ipBlocked = true;
    })
    .addCase(clearIpBlockSuccess, (state) => {
      state.ipBlocked = false;
      state.errors["login"] = undefined;
    })
    .addCase(refreshToken, (state) => {
      state.auth = true;
    }),
);
