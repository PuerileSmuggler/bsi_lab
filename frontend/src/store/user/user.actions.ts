import { createAction } from "@reduxjs/toolkit";
import { UserActionTypes } from "./user.actions.types";

export const loginUser = createAction(UserActionTypes.Login);
export const loginUserSuccess = createAction(UserActionTypes.LoginSuccess);
export const loginUserError = createAction(UserActionTypes.LoginError);

export const logoutUser = createAction(UserActionTypes.Logout);
export const logoutUserSuccess = createAction(UserActionTypes.LogoutSuccess);
export const logoutUserError = createAction(UserActionTypes.LogoutError);
