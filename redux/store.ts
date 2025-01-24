import { configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./CommonSlice";
import authSlice from "./AuthSlice";
import peopleSlice from "./PeopleSlice";

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    auth: authSlice.reducer,
    people: peopleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
