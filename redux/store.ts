import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./CommonSlice";
import authSlice from "./AuthSlice";
import peopleSlice from "./PeopleSlice";
import txnSlice from "./TxnSlice";

const appReducer = combineReducers({
  common: commonSlice.reducer,
  auth: authSlice.reducer,
  people: peopleSlice.reducer,
  txn: txnSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
