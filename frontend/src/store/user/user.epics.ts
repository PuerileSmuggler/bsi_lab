import { combineEpics, Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { loginUser, logoutUser, logoutUserSuccess } from "./user.actions";

export const loginEpic: Epic = (action$) =>
  action$.pipe(ofType(loginUser.type));

export const logoutEpic: Epic = (action$, _, { browserHistory }) =>
  action$.pipe(
    ofType(logoutUser.type),
    switchMap(() => {
      if (
        browserHistory.location.pathname !== "/changePassword" &&
        !/\/reset-password\/.*/.test(browserHistory.location.pathname)
      ) {
        browserHistory.push("/login");
      }
      return of(logoutUserSuccess());
    })
  );

export const userEpics = combineEpics(loginEpic, logoutEpic);
