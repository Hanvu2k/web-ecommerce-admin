import { createSlice } from "@reduxjs/toolkit";
import { getRole } from "../api/roleApi";

// Define the initial state for the cartSlice
const initialRoleState = {
  isLoading: false,
  role: [],
};

const RoleSilce = createSlice({
  name: "role",
  initialState: initialRoleState,
  reducers: {},
  extraReducers: {
    // get all categories
    [getRole.pending]: (state) => {
      state.isLoading = true;
    },
    [getRole.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.role = action.payload;
    },
    [getRole.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the generated action creators
export const productActions = RoleSilce.actions;

export default RoleSilce.reducer;
