import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    forgotPwdModalVisible: false,
    addPersonModalVisible: false,
    triggerPeopleRefresh: false,
  },
  reducers: {
    setForgotPwdVisibility(state, action) {
      state.forgotPwdModalVisible = action.payload;
    },

    setAddPersonVisibility(state, action) {
      state.addPersonModalVisible = action.payload;
    },

    setPeopleRefresh(state, action) {
      state.triggerPeopleRefresh = action.payload;
    },
  },
});

export const commonSliceActions = commonSlice.actions;

export default commonSlice.reducer;
