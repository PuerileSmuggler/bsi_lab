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

const sharedPasswordsSelector = (state: AppState): PasswordsPaginatedDTO =>
  state.user.sharedPasswords;

const sharingPasswordsSelector = (state: AppState): PasswordsPaginatedDTO =>
  state.user.sharingPasswords;

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

export const getSharedPasswordsSelector = createSelector(
  sharedPasswordsSelector,
  (sharedPasswords) => sharedPasswords,
);

export const getSharingPasswordsSelector = createSelector(
  sharingPasswordsSelector,
  (sharingPasswords) => sharingPasswords,
);

export const getPasswordSelector = createSelector(
  passwordSelector,
  (password) => password,
);
export const getIpBlockedSelector = createSelector(
  ipBlockedSelector,
  (ipBlocked) => ipBlocked,
);
