import { createSlice } from "@reduxjs/toolkit";

export const accessories = createSlice({
  name: "accessory",
  initialState: {
    accessories: [],
  },
  reducers: {
    getAllAccessory: (state, action) => {
      state.accessories = action.payload;
    },
    addAccessory: (state, action) => {
      state.accessories.push(action.payload);
    },
    updateAccessory: (state, action) => {
      state.accessories = state.accessories.map((accessory) => {
        return accessory.id === action.payload.id ? action.payload : accessory;
      });
    },
    deleteAccessory: (state, action) => {
      state.accessories.find((accessory, i) => {
        if (accessory.id === action.payload) {
          return state.accessory.splice(i, 1);
        }
      });
    },
  },
});
export const {
  getAllAccessory,
  addAccessory,
  updateAccessory,
  deleteAccessory,
} = accessories.actions;

export default accessories.reducer;