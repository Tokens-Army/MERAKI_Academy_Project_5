import { createSlice } from "@reduxjs/toolkit";
export const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
  },
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    addAdmins: (state, action) => {
      console.log(action.payload);
      console.log(state);
      state.admins.push(action.payload);
    },
    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter((admin) => {
        return admin.id !== action.payload;
      });
    },
  },
});
export const { setAdmins, addAdmins, deleteAdmin } = adminSlice.actions;
export default adminSlice.reducer;
