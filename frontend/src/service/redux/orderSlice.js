import { createSlice } from "@reduxjs/toolkit";
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {} || JSON.parse(localStorage.getItem("order")),
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      const object = JSON.stringify(action.payload);
      localStorage.setItem("order", object);
    },
  },
});

export const { setOrder } = loginSlice.actions;
export default orderSlice.reducer;
