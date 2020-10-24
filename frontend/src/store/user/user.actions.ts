import { createAction } from "@reduxjs/toolkit";
import { UserActionTypes } from "./user.actions.types";
import { CreatePasswordPayload, LoginUserPayload } from "./user.interface";

export const loginUser = createAction<LoginUserPayload>(UserActionTypes.Login);
export const loginUserSuccess = createAction<string>(
  UserActionTypes.LoginSuccess
);
export const loginUserError = createAction<any>(UserActionTypes.LoginError);

export const registerUser = createAction<LoginUserPayload>(
  UserActionTypes.Register
);
export const registerUserSuccess = createAction<string>(
  UserActionTypes.RegisterSuccess
);
export const registerUserError = createAction<any>(
  UserActionTypes.RegisterError
);

export const createPassword = createAction<CreatePasswordPayload>(
  UserActionTypes.CreatePassword
);
export const createPasswordSuccess = createAction<string>(
  UserActionTypes.CreatePasswordSuccess
);
export const createPasswordError = createAction<any>(
  UserActionTypes.CreatePasswordError
);

export const logoutUser = createAction(UserActionTypes.Logout);
export const logoutUserSuccess = createAction(UserActionTypes.LogoutSuccess);
export const logoutUserError = createAction(UserActionTypes.LogoutError);
