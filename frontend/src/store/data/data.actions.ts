import { createAction } from "@reduxjs/toolkit";
import { DataChangeDTO } from "../user/user.interface";
import { DataActionTypes } from "./data.actions.types";

export const getDataChanges = createAction(DataActionTypes.getDataChanges);
export const getDataChangesSuccess = createAction<Array<DataChangeDTO>>(DataActionTypes.getDataChangesSuccess);
export const getDataChangesError = createAction<any>(DataActionTypes.getDataChangesError);
export const revertDataChange = createAction<DataChangeDTO>(DataActionTypes.revertDataChange);
export const revertDataChangeSuccess = createAction(DataActionTypes.revertDataChangeSuccess);
export const revertDataChangeError = createAction<any>(DataActionTypes.revertDataChangeError);