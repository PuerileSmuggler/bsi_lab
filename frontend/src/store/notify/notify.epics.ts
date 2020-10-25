import { toast } from "react-toastify";
import { combineEpics, Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import {
  createPasswordSuccess,
  loginUserSuccess,
  registerUserSuccess,
} from "../user/user.actions";

export const notifySuccessEpic: Epic = (action$) =>
  action$.pipe(
    ofType(
      loginUserSuccess.type,
      registerUserSuccess.type,
      createPasswordSuccess.type
    ),
    switchMap(({ payload }) => {
      toast(payload, { hideProgressBar: true, type: "success" });
      return of();
    })
  );

export const notifyEpics = combineEpics(notifySuccessEpic);
