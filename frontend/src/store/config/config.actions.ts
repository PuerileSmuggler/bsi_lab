import { createAction } from "@reduxjs/toolkit";
import { ConfigActionTypes } from "./config.actions.types";

export const setEditMode = createAction<boolean>(ConfigActionTypes.setEditMode);