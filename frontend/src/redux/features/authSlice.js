import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: token || null,

    isAuthenticated: token ? true : false,

    admin: null,

    loading: false,
  },

  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;

      state.token = action.payload.token;

      state.admin = action.payload.admin;

      state.isAuthenticated = true;
    },

    loginFail: (state) => {
      state.loading = false;

      state.isAuthenticated = false;
    },

    logout: (state) => {
      state.token = null;

      state.admin = null;

      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },
});

export const {
  loginStart,

  loginSuccess,

  loginFail,

  logout,
} = authSlice.actions;

export default authSlice.reducer;
