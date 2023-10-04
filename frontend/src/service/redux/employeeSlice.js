import { createSlice } from "@reduxjs/toolkit";
export const employeesSlice =createSlice({
    name:"data",
    initialState:{
        data : []
    },
    reducers:{
        setData: (state,action)=>{
            state.data=action.payload
        },
        addEmployee:(state,action)=>{
           
            state.data.orders.map((order)=>{
                if (order.id===action.payload.id){
                    order.order_status = "accepted"
                    order.employee_id = action.payload.employee_id
                }   
            })
        }
    }
})
export const {setData,addEmployee} = employeesSlice.actions
export default employeesSlice.reducer