import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    roleId: null || localStorage.getItem("roleId"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setRoleId: (state, action) => {
        state.roleId = action.payload;
        localStorage.setItem("roleId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.roleId = null;
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setUserId, setRoleId, setLogout } = loginSlice.actions;
export const { setLogin, setUserId, setLogout } = loginSlice.actions;

export default loginSlice.reducer;
