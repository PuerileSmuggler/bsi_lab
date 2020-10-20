import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, Reducer } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { browserHistory } from "../utils/browserHistory";
import { logoutUserSuccess } from "./user/user.actions";
import { userEpics } from "./user/user.epics";
import { userReducer } from "./user/user.reducer";

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer: Reducer = (state, action) => {
  if (action.type === logoutUserSuccess().type) {
    state = undefined;
  }

  return appReducer(state, action);
};

const epicMiddleware = createEpicMiddleware({
  dependencies: { browserHistory },
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

epicMiddleware.run(combineEpics(userEpics));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (process.env.NODE_ENV !== "production" && module.hot) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  module.hot.accept("./", () => store.replaceReducer(rootReducer));
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export default store;
