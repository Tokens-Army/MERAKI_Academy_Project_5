import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import orderReducer from "./orderSlice";
import servicesReducer from "./serviceSlice"
import adminsReducer from "./adminSlice"
import accessoryReducer from "./accessorySlice";
import employeeesReducer from "./employeeSlice";


export default configureStore({
  reducer: {
    login: loginReducer,
    order: orderReducer,
    services: servicesReducer,
    admins: adminsReducer,
    accessories: accessoryReducer,
    employees: employeeesReducer,
  },
});
