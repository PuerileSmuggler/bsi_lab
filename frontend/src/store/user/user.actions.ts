import { createAction } from "@reduxjs/toolkit";
import { UserActionTypes } from "./user.actions.types";
import {
  CreatePasswordPayload,
  DeletePasswordDTO,
  EditUserDTO,
  LoginUserPayload,
  LoginUserResponseDTO,
  PaginationDTO,
  PasswordDTO,
  PasswordResponseDTO,
  PasswordsPaginatedDTO,
  RemoveSharePasswordDTO,
  SharePasswordDTO,
} from "./user.interface";

export const loginUser = createAction<LoginUserPayload>(UserActionTypes.Login);
export const loginUserSuccess = createAction<LoginUserResponseDTO>(
  UserActionTypes.LoginSuccess,
);
export const loginUserError = createAction<string | undefined>(
  UserActionTypes.LoginError,
);
export const clearLoginUserError = createAction(
  UserActionTypes.ClearLoginError,
);

export const refreshToken = createAction(UserActionTypes.RefreshToken);

export const refreshTokenSuccess = createAction<LoginUserResponseDTO>(
  UserActionTypes.RefreshTokenSuccess,
);
export const refreshTokenError = createAction<string | undefined>(
  UserActionTypes.RefreshTokenError,
);

export const registerUser = createAction<LoginUserPayload>(
  UserActionTypes.Register,
);
export const registerUserSuccess = createAction<string>(
  UserActionTypes.RegisterSuccess,
);
export const registerUserError = createAction<any>(
  UserActionTypes.RegisterError,
);

export const createPassword = createAction<CreatePasswordPayload>(
  UserActionTypes.CreatePassword,
);
export const createPasswordSuccess = createAction<string>(
  UserActionTypes.CreatePasswordSuccess,
);
export const createPasswordError = createAction<any>(
  UserActionTypes.CreatePasswordError,
);

export const logoutUser = createAction(UserActionTypes.Logout);
export const logoutUserSuccess = createAction(UserActionTypes.LogoutSuccess);
export const logoutUserError = createAction(UserActionTypes.LogoutError);

export const deletePassword = createAction<DeletePasswordDTO>(
  UserActionTypes.DeletePassword,
);
export const deletePasswordSuccess = createAction<string>(
  UserActionTypes.DeletePasswordSuccess,
);
export const deletePasswordError = createAction<any>(
  UserActionTypes.DeletePasswordError,
);

export const editPassword = createAction<PasswordDTO>(
  UserActionTypes.EditPassword,
);
export const editPasswordSuccess = createAction<string>(
  UserActionTypes.EditPasswordSuccess,
);
export const editPasswordError = createAction<any>(
  UserActionTypes.EditPasswordError,
);

export const editUser = createAction<EditUserDTO>(UserActionTypes.EditUser);
export const editUserSuccess = createAction<string>(
  UserActionTypes.EditUserSuccess,
);
export const editUserError = createAction<any>(UserActionTypes.EditUserError);

export const getAllPasswords = createAction<PaginationDTO>(
  UserActionTypes.GetAllPasswords,
);
export const getAllPasswordsSuccess = createAction<PasswordsPaginatedDTO>(
  UserActionTypes.GetAllPasswordsSuccess,
);
export const getAllPasswordsError = createAction<any>(
  UserActionTypes.GetAllPasswordsError,
);
export const getAllSharedPasswords = createAction<PaginationDTO>(
  UserActionTypes.GetAllSharedPasswords,
);
export const getAllSharedPasswordsSuccess = createAction<PasswordsPaginatedDTO>(
  UserActionTypes.GetAllSharedPasswordsSuccess,
);
export const getAllSharedPasswordsError = createAction<any>(
  UserActionTypes.GetAllSharedPasswordsError,
);
export const getSharingPasswords = createAction<PaginationDTO>(
  UserActionTypes.sharingPasswords,
);
export const getSharingPasswordsSuccess = createAction<PasswordsPaginatedDTO>(
  UserActionTypes.sharingPasswordsSuccess,
);
export const getSharingPasswordsError = createAction<any>(
  UserActionTypes.sharingPasswordsError,
);
export const getPasswordById = createAction<string>(
  UserActionTypes.GetPasswordById,
);
export const getPasswordByIdSuccess = createAction<PasswordResponseDTO>(
  UserActionTypes.GetPasswordByIdSuccess,
);
export const getPasswordByIdError = createAction<any>(
  UserActionTypes.GetPasswordByIdError,
);
export const clearPassword = createAction(UserActionTypes.ClearPassword);
export const clearIpBlock = createAction(UserActionTypes.ClearIpBlock);
export const clearIpBlockSuccess = createAction(
  UserActionTypes.ClearIpBlockSuccess,
);
export const clearIpBlockError = createAction<any>(
  UserActionTypes.ClearIpBlockError,
);
export const setIpBlock = createAction(UserActionTypes.SetIpBlock);

export const sharePassword = createAction<SharePasswordDTO>(
  UserActionTypes.sharePassword,
);

export const sharePasswordSuccess = createAction(
  UserActionTypes.sharePasswordSuccess,
);

export const sharePasswordError = createAction<any>(
  UserActionTypes.sharePasswordError,
);

export const removeSharePassword = createAction<RemoveSharePasswordDTO>(
  UserActionTypes.removeSharingPasswords,
);

export const removeSharePasswordSuccess = createAction(
  UserActionTypes.removeSharingPasswordsSuccess,
);

export const removeSharePasswordError = createAction<any>(
  UserActionTypes.removeSharingPasswordsError,
);
