import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";
import { CreatePasswordPayload } from "./user.interface";

const authSelector = (state: AppState): boolean => state.user.auth;

const passwordsSelector = (state: AppState): Array<CreatePasswordPayload> =>
  state.user.passwords;

export const getAuthSelector = createSelector(authSelector, (auth) => auth);

export const getPasswordsSelector = createSelector(
  passwordsSelector,
  (passwords) => passwords
);
