import { createSlice } from "@reduxjs/toolkit";
 
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: JSON.parse(localStorage.getItem("order")) || {},
    orders:[],
    totalCash: 0 || localStorage.getItem("totalCash")
  },
  reducers: {
    setOrders:(state,action)=>{
      state.orders = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    updateCash: (state, action) => {
      console.log(state.totalCash);
      console.log(action.payload);
      // state.totalCash = state.totalCash+action.payload;
      localStorage.setItem("totalCash",state.totalCash+action.payload)
    },
  },
});

export const { setOrder,setOrders,updateCash } = orderSlice.actions;
export default orderSlice.reducer;
