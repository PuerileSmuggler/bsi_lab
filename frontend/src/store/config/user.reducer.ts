import { createReducer } from "@reduxjs/toolkit";
import {
  setEditMode
} from "./config.actions";
import { IConfigState } from "./user.interface";

const initState: IConfigState = {
  editMode: false,
};

export const configReducer = createReducer(initState, (builder) =>
  builder
    .addCase(setEditMode, (state, action) => {
      state.editMode = action.payload;
    })
);
