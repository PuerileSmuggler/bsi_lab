import { createReducer } from "@reduxjs/toolkit";
import { getAllPasswordsSuccess, loginUserSuccess } from "./user.actions";
import { IUserState } from "./user.interface";

const initState: IUserState = {
  auth: false,
  passwords: { count: 0, passwords: [] },
};

export const userReducer = createReducer(initState, (builder) =>
  builder
    .addCase(loginUserSuccess, (state) => {
      state.auth = true;
    })
    .addCase(getAllPasswordsSuccess, (state, action) => {
      state.passwords = action.payload;
    })
);
