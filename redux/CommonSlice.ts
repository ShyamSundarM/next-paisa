import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    forgotPwdModalVisible: false,
    addPersonModalVisible: false,
  },
  reducers: {
    setForgotPwdVisibility(state, action) {
      state.forgotPwdModalVisible = action.payload;
    },

    setAddPersonVisibility(state, action) {
      state.addPersonModalVisible = action.payload;
    },
  },
});

export const commonSliceActions = commonSlice.actions;

export default commonSlice.reducer;
