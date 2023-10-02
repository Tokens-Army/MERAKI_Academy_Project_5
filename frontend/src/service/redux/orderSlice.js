import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: JSON.parse(localStorage.getItem("order")) || {},
    orders:[]
  },
  reducers: {
    setOrders:(state,action)=>{
      state.orders = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder,setOrders } = orderSlice.actions;
export default orderSlice.reducer;
