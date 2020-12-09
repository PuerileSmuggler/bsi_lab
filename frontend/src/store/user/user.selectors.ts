import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";
import { PasswordResponseDTO, PasswordsPaginatedDTO } from "./user.interface";

const authSelector = (state: AppState): boolean => state.user.auth;

const loginErrorSelector = (state: AppState): string | undefined =>
  state.user.errors["login"];

const passwordsSelector = (state: AppState): PasswordsPaginatedDTO =>
  state.user.passwords;

const passwordSelector = (state: AppState): PasswordResponseDTO | undefined =>
  state.user.password;
const ipBlockedSelector = (state: AppState): boolean => state.user.ipBlocked;

export const getAuthSelector = createSelector(authSelector, (auth) => auth);

export const getLoginErrorSelector = createSelector(
  loginErrorSelector,
  (error) => error,
);

export const getPasswordsSelector = createSelector(
  passwordsSelector,
  (passwords) => passwords,
);

export const getPasswordSelector = createSelector(
  passwordSelector,
  (password) => password,
);
export const getIpBlockedSelector = createSelector(
  ipBlockedSelector,
  (ipBlocked) => ipBlocked,
);
