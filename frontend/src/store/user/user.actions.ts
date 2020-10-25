import { createAction } from "@reduxjs/toolkit";
import { UserActionTypes } from "./user.actions.types";
import {
  CreatePasswordPayload,
  DeletePasswordDTO,
  LoginUserPayload,
  PaginationDTO,
  PasswordsPaginatedDTO,
  UpdatePasswordDTO,
} from "./user.interface";

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

export const deletePassword = createAction<DeletePasswordDTO>(
  UserActionTypes.DeletePassword
);
export const deletePasswordSuccess = createAction<string>(
  UserActionTypes.DeletePasswordSuccess
);
export const deletePasswordError = createAction<any>(
  UserActionTypes.DeletePasswordError
);

export const editPassword = createAction<UpdatePasswordDTO>(
  UserActionTypes.EditPassword
);
export const editPasswordSuccess = createAction<string>(
  UserActionTypes.EditPasswordSuccess
);
export const editPasswordError = createAction<any>(
  UserActionTypes.EditPasswordError
);

export const getAllPasswords = createAction<PaginationDTO>(
  UserActionTypes.GetAllPasswords
);
export const getAllPasswordsSuccess = createAction<PasswordsPaginatedDTO>(
  UserActionTypes.GetAllPasswordsSuccess
);
export const getAllPasswordsError = createAction<any>(
  UserActionTypes.GetAllPasswordsError
);
