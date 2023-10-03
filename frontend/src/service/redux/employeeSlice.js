import { createSlice } from "@reduxjs/toolkit";
export const employeesSlice =createSlice({
    name:"employees",
    initialState:{
        employees : []
    },
    reducers:{
        setEmployees: (state,action)=>{
            state.employees=action.payload
        },
    }
})
export const {setEmployees} = employeesSlice.actions
export default employeesSlice.reducer