import { Txn } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  txns: Array<Txn>;
  callbackFlag: boolean;
  selectedRows: Array<number>;
  deleteEvent: boolean;
  editEvent: boolean;
  paidPopup: boolean;
  resetPwdPopup: boolean;
};

const initialState: StateType = {
  txns: [],
  callbackFlag: false,
  selectedRows: [],
  deleteEvent: false,
  editEvent: false,
  paidPopup: false,
  resetPwdPopup: false,
};

const txnSlice = createSlice({
  name: "txn",
  initialState,
  reducers: {
    setTxns(state, action) {
      state.txns = action.payload;
    },
    SetCallbackFlag(state, action) {
      state.callbackFlag = action.payload;
    },
    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
    triggerDeleteEvent(state, action) {
      state.deleteEvent = action.payload;
    },
    triggerEdit(state, action) {
      state.editEvent = action.payload;
    },
    togglePaidPopupVisibility(state, action) {
      state.paidPopup = action.payload;
    },
    toggleResetPwdVisibility(state, action) {
      state.resetPwdPopup = action.payload;
    },
  },
});

export default txnSlice;
export const txnSliceActions = txnSlice.actions;
