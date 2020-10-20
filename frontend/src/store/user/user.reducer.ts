import { createReducer } from "@reduxjs/toolkit";
import { loginUserSuccess } from "./user.actions";
import { IUserState } from "./user.interface";

const initState: IUserState = {
  auth: false,
};

export const userReducer = createReducer(initState, (builder) =>
  builder.addCase(loginUserSuccess, (state) => {
    state.auth = true;
  })
);
