import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    forgotPwdModalVisible: false,
  },
  reducers: {
    setForgotPwdVisibility(state, action) {
      state.forgotPwdModalVisible = action.payload;
    },
  },
});

export const commonSliceActions = commonSlice.actions;

export default commonSlice.reducer;
