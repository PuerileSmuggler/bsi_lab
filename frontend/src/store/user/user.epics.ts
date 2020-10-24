import { combineEpics, Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { request, tokenStorageKey } from "../../utils/api";
import {
  loginUser,
  loginUserError,
  loginUserSuccess,
  logoutUser,
  logoutUserSuccess,
  registerUser,
  registerUserSuccess,
} from "./user.actions";

export const loginEpic: Epic = (action$) =>
  action$.pipe(
    ofType(loginUser.type),
    switchMap(({ payload }) =>
      from(request("auth/login", payload)).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((body) => {
              const token = body["access_token"];
              if (token) {
                localStorage.setItem(tokenStorageKey, token);
              }
              return of(loginUserSuccess("Successfully logged in"));
            })
          )
        ),
        catchError((error) => {
          return of(loginUserError(error));
        })
      )
    )
  );

export const registerEpic: Epic = (action$) =>
  action$.pipe(
    ofType(registerUser.type),
    switchMap(({ payload }) =>
      from(request("auth/login", payload)).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((body) => {
              const token = body["access_token"];
              if (token) {
                localStorage.setItem(tokenStorageKey, token);
              }
              return of(registerUserSuccess("Successfully created an account"));
            })
          )
        ),
        catchError((error) => {
          return of(loginUserError(error));
        })
      )
    )
  );

export const logoutEpic: Epic = (action$, _, { browserHistory }) =>
  action$.pipe(
    ofType(logoutUser.type),
    switchMap(() => {
      browserHistory.push("/login");
      return of(logoutUserSuccess());
    })
  );

export const userEpics = combineEpics(loginEpic, logoutEpic);
