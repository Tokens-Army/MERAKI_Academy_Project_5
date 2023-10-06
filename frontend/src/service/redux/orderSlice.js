import { createSlice } from "@reduxjs/toolkit";
 
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: JSON.parse(localStorage.getItem("order")) || {},
    orders:[],
    total_cash:0
  },
  reducers: {
    setOrders:(state,action)=>{
      state.orders = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    total_price: (state, action) => {
      state.total_cash = action.payload;

    },
  },
});

export const { setOrder,setOrders,total_price } = orderSlice.actions;
export default orderSlice.reducer;
