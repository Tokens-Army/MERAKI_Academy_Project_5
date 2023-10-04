import { createSlice } from "@reduxjs/toolkit";

export const accessories = createSlice({
  name: "accessory",
  initialState: {
    accessories: [],
  },
  reducers: {
    setAccessories: (state, action) => {
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
          return state.accessories.splice(i, 1);
        }
      });
    },
  },
});

export const {
  setAccessories,
  addAccessory,
  updateAccessory,
  deleteAccessory,
} = accessories.actions;

export default accessories.reducer;
