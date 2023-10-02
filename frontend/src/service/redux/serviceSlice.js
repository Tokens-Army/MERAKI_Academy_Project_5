import { createSlice } from "@reduxjs/toolkit";
export const serviceSlice =createSlice({
    name:"services",
    initialState:{
        services : []
    },
    reducers:{
        setServices: (state,action)=>{
            state.services=action.payload
        },
        addServices: (state,action)=>{
            console.log(action.payload);
            console.log(state);
            state.services.push(action.payload)
        },
        updateServices:(state,action)=>{
            console.log(state.services);
            state.services.map((service)=>{
                if (service.id===action.payload.id){
                    service.name = action.payload.name
                    service.img=action.payload.img
                    service.description=action.payload.description
                    service.price=action.payload.price
                    
                }
                return service
            })
        },
        deleteService:(state,action)=>{
            state.services=state.services.filter((service)=>{
                return service.id !==action.payload
            })
        }

    }
})
export const {setServices,addServices,updateServices,deleteService} = serviceSlice.actions
export default serviceSlice.reducer