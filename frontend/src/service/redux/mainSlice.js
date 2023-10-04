import { createSlice } from "@reduxjs/toolkit";
export const mainSlice =createSlice({
    name:"data2",
    initialState:{
        data : [],
        // toggle: localStorage.getItem("token") ? true : false,
    },
    reducers:{
        setMain: (state,action)=>{
            state.data=action.payload
        },
    }
})
export const {setMain} = mainSlice.actions
export default mainSlice.reducer