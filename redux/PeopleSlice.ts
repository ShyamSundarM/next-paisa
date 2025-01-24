import { Person } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  data: Array<Person>;
  //isLoading: boolean;
  //callbackFlag: boolean;
};

const initialState: StateType = {
  data: [],
  //isLoading: false,
  //callbackFlag: false,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    Set(state, action) {
      state.data = action.payload;
    },

    // SetCallbackFlag(state, action) {
    //   state.callbackFlag = action.payload;
    // },
  },
});

export default peopleSlice;
export const peopleSliceActions = peopleSlice.actions;
