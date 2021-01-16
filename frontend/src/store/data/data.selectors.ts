import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";
import { DataChangeDTO } from "../user/user.interface";

const dataChangesSelector = (state: AppState): Array<DataChangeDTO> => state.data.dataChanges;

export const getDataChangesSelector = createSelector(dataChangesSelector, (dataChanges) => dataChanges);