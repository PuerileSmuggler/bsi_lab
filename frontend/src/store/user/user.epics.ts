import { combineEpics, Epic, ofType } from "redux-observable";
import { from, of, timer } from "rxjs";
import { catchError, delayWhen, switchMap } from "rxjs/operators";
import { request, tokenStorageKey } from "../../utils/api";
import { keyStorageKey } from "../../utils/cipher";
import {
  createPassword,
  deletePassword,
  deletePasswordError,
  deletePasswordSuccess,
  editPassword,
  editPasswordError,
  editPasswordSuccess,
  editUser,
  editUserError,
  editUserSuccess,
  getAllPasswords,
  getAllPasswordsError,
  getAllPasswordsSuccess,
  getPasswordById,
  getPasswordByIdError,
  getPasswordByIdSuccess,
  loginUser,
  loginUserError,
  loginUserSuccess,
  logoutUser,
  logoutUserSuccess,
  refreshToken,
  refreshTokenError,
  refreshTokenSuccess,
  registerUser,
  registerUserError,
  registerUserSuccess,
} from "./user.actions";

export const loginEpic: Epic = (action$) =>
  action$.pipe(
    ofType(loginUser.type),
    switchMap(({ payload }) =>
      from(request("auth/login", "POST", payload)).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((body) => {
              const { access_token: accessToken, key } = body;
              if (accessToken && key) {
                localStorage.setItem(tokenStorageKey, accessToken);
                localStorage.setItem(keyStorageKey, payload.password);
              }
              return of(loginUserSuccess(body));
            }),
          ),
        ),
        catchError(({ message }) => {
          let error;
          if (message === "401") {
            error = "Invalid email or password";
          }
          return of(loginUserError(error));
        }),
      ),
    ),
  );

export const refreshTokenTimeoutEpic: Epic = (action$) =>
  action$.pipe(
    ofType(loginUser.type, refreshTokenSuccess.type),
    switchMap(() =>
      from(request("refreshToken", "GET")).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            delayWhen(({ ttl = 5990 }) => timer((ttl - 10) * 1000)),
            switchMap((body) => {
              const { access_token: accessToken } = body;
              if (accessToken) {
                localStorage.setItem(tokenStorageKey, accessToken);
              }
              return of(refreshTokenSuccess(body));
            }),
          ),
        ),
        catchError(({ message }) => {
          return of(refreshTokenError(message));
        }),
      ),
    ),
  );

export const refreshTokenEpic: Epic = (action$) =>
  action$.pipe(
    ofType(refreshToken.type),
    switchMap(() =>
      from(request("refreshToken", "GET")).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((body) => {
              const { access_token: accessToken } = body;
              if (accessToken) {
                localStorage.setItem(tokenStorageKey, accessToken);
              }
              return of(refreshTokenSuccess(body));
            }),
          ),
        ),
        catchError(({ message }) => {
          return of(refreshTokenError(message));
        }),
      ),
    ),
  );

export const registerEpic: Epic = (action$, _$state, { browserHistory }) =>
  action$.pipe(
    ofType(registerUser.type),
    switchMap(({ payload }) =>
      from(request("auth/register", "POST", payload)).pipe(
        switchMap(() => {
          browserHistory.push("/login");
          return of(registerUserSuccess("Successfully created an account"));
        }),
        catchError((error) => {
          return of(registerUserError(error));
        }),
      ),
    ),
  );

export const createPasswordEpic: Epic = (
  action$,
  _$state,
  { browserHistory },
) =>
  action$.pipe(
    ofType(createPassword.type),
    switchMap(({ payload }) =>
      from(request("password/create", "POST", payload)).pipe(
        switchMap(() => {
          browserHistory.push("/home");
          return of(
            registerUserSuccess("Successfully created a password entry"),
          );
        }),
        catchError((error) => {
          return of(loginUserError(error));
        }),
      ),
    ),
  );

export const getPasswordsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getAllPasswords.type),
    switchMap(({ payload }) =>
      from(request("password", "POST", payload)).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((result) => {
              return of(getAllPasswordsSuccess(result));
            }),
          ),
        ),
        catchError((error) => {
          return of(getAllPasswordsError(error));
        }),
      ),
    ),
  );

export const getPasswordByIdEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getPasswordById.type),
    switchMap(({ payload }) =>
      from(request(`password/${payload}`, "GET")).pipe(
        switchMap((response) =>
          from(response.json()).pipe(
            switchMap((result) => {
              return of(getPasswordByIdSuccess(result));
            }),
          ),
        ),
        catchError((error) => {
          return of(getPasswordByIdError(error));
        }),
      ),
    ),
  );

export const deletePasswordEpic: Epic = (action$) =>
  action$.pipe(
    ofType(deletePassword.type),
    switchMap(({ payload }) =>
      from(request("password", "DELETE", payload)).pipe(
        switchMap(() => {
          return of(deletePasswordSuccess("Successfully deleted a password"));
        }),
        catchError((error) => {
          return of(deletePasswordError(error));
        }),
      ),
    ),
  );

export const editPasswordEpic: Epic = (action$, _$state, { browserHistory }) =>
  action$.pipe(
    ofType(editPassword.type),
    switchMap(({ payload }) => {
      return from(request("password/edit", "POST", payload)).pipe(
        switchMap(() => {
          browserHistory.push("/home");
          return of(editPasswordSuccess("Successfully updated a password"));
        }),
        catchError((error) => {
          return of(editPasswordError(error));
        }),
      );
    }),
  );

export const editUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(editUser.type),
    switchMap(({ payload }) => {
      return from(request("auth/edit", "POST", payload)).pipe(
        switchMap(() =>
          of(
            logoutUser(),
            editUserSuccess("Successfully updated master password"),
          ),
        ),
        catchError((error) => {
          return of(editUserError(error));
        }),
      );
    }),
  );

export const logoutEpic: Epic = (action$, _, { browserHistory }) =>
  action$.pipe(
    ofType(logoutUser.type),
    switchMap(() => {
      localStorage.removeItem(keyStorageKey);
      localStorage.removeItem(tokenStorageKey);
      browserHistory.push("/login");
      return of(logoutUserSuccess());
    }),
  );

export const userEpics = combineEpics(
  loginEpic,
  logoutEpic,
  registerEpic,
  createPasswordEpic,
  getPasswordsEpic,
  deletePasswordEpic,
  editPasswordEpic,
  editUserEpic,
  refreshTokenEpic,
  refreshTokenTimeoutEpic,
  getPasswordByIdEpic,
);
