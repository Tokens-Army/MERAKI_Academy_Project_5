import { createSlice } from "@reduxjs/toolkit";
export const mainSlice =createSlice({
    name:"data2",
    initialState:{
        data : false,
        orders : []    
    },
    reducers:{
        setMain: (state,action)=>{
            state.data=action.payload
        },setOrders: (state,action)=>{
            state.orders=action.payload
        },
    }
})
export const {setMain,setOrders} = mainSlice.actions
export default mainSlice.reducer