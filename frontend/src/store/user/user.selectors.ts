import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";
import { PasswordsPaginatedDTO } from "./user.interface";

const authSelector = (state: AppState): boolean => state.user.auth;

const loginErrorSelector = (state: AppState): string | undefined =>
  state.user.errors["login"];

const passwordsSelector = (state: AppState): PasswordsPaginatedDTO =>
  state.user.passwords;

export const getAuthSelector = createSelector(authSelector, (auth) => auth);

export const getLoginErrorSelector = createSelector(
  loginErrorSelector,
  (error) => error,
);

export const getPasswordsSelector = createSelector(
  passwordsSelector,
  (passwords) => passwords,
);
