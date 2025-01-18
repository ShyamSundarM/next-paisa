import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export type Auth = {
  token: string;
  expiresIn: string;
  userName: string;
  email: string;
  role: string;
  userId: number;
};

const initialState: Auth = {
  token: null,
  expiresIn: null,
  userName: null,
  email: null,
  role: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Set(state, action) {
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
      try {
        const claims = jwtDecode(action.payload.token);
        state.email =
          claims[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];
        state.userName =
          claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        state.role =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.userId =
          +claims[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
      } catch {}
    },
  },
});

export default authSlice;
export const authSliceActions = authSlice.actions;
