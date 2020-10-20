import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";

const authSelector = (state: AppState): boolean => state.user.auth;

export const getAuthSelector = createSelector(authSelector, (auth) => auth);
