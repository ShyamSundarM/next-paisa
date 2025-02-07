import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    forgotPwdModalVisible: false,
    addPersonModalVisible: false,
    addTxnModalVisible: false,
    triggerPeopleRefresh: false,
    triggerTxnsRefresh: false,
  },
  reducers: {
    setForgotPwdVisibility(state, action) {
      state.forgotPwdModalVisible = action.payload;
    },

    setAddPersonVisibility(state, action) {
      state.addPersonModalVisible = action.payload;
    },

    setAddTxnVisibility(state, action) {
      state.addTxnModalVisible = action.payload;
    },

    setPeopleRefresh(state, action) {
      state.triggerPeopleRefresh = action.payload;
    },

    setTxnsRefresh(state, action) {
      state.triggerTxnsRefresh = action.payload;
    },
  },
});

export const commonSliceActions = commonSlice.actions;

export default commonSlice.reducer;
