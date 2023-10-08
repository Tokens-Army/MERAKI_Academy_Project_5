import { createSlice } from "@reduxjs/toolkit";
 
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: JSON.parse(localStorage.getItem("order")) || {},
    orders:[],
    orderDetails:[]
  },
  reducers: {
    setOrders:(state,action)=>{
      state.orders = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
   
  },
});

export const { setOrder,setOrders,setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
