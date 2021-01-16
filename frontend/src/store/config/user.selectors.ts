import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";

const editModeSelector = (state: AppState): boolean => state.config.editMode;


export const getEditModeSelector = createSelector(editModeSelector, (editMode) => editMode);