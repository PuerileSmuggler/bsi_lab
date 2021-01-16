import { createReducer } from "@reduxjs/toolkit";
import {
  getDataChangesSuccess
} from "./data.actions";
import { IDataState } from "./data.interface";

const initState: IDataState = {
  dataChanges: []
};

export const dataChangesReducer = createReducer(initState, (builder) =>
  builder
    .addCase(getDataChangesSuccess, (state, action) => {
      state.dataChanges = action.payload;
    })
);
