import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../api/categoryApi";

// Define the initial state for the cartSlice
const initialCategoryState = {
  isLoading: false,
  category: [],
};

const CategorySilce = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: {
    // get all categories
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the generated action creators
export const productActions = CategorySilce.actions;

export default CategorySilce.reducer;
