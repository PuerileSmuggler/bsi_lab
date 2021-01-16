import { combineEpics, Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { request } from "../../utils/api";
import {
  getDataChanges,
  getDataChangesError,
  getDataChangesSuccess,
  revertDataChange,
  revertDataChangeError,
  revertDataChangeSuccess
} from "./data.actions";

export const getDataChangesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getDataChanges.type, revertDataChangeSuccess.type),
    switchMap(() =>
      from(request("dataChanges", "GET")).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((body) => {
              console.log(body);
              return of(getDataChangesSuccess(body));
            }),
          ),
        ),
        catchError(({ message }) => {
          return of(getDataChangesError(message));
        }),
      ),
    ),
  );

export const revertDataChangesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(revertDataChange.type),
    switchMap(({ payload }) =>
      from(request("dataChanges", "POST", payload)).pipe(
        switchMap(() =>
          of(revertDataChangeSuccess())
        ),
        catchError(({ message }) => {
          return of(revertDataChangeError(message));
        }),
      ),
    ),
  );

export const dataChangesEpics = combineEpics(
  getDataChangesEpic,
  revertDataChangesEpic,
);
