import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProduct,
  searchProductByKey,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../api/productApi";

// Define the initial state for the cartSlice
const initialProductState = {
  isLoading: false,
  products: [],
  product: {},
  err: {},
};

const ProductSilce = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {},
  extraReducers: {
    // create product
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [createProduct.rejected]: (state) => {
      state.isLoading = false;
    },

    // get all product
    [getAllProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getAllProduct.rejected]: (state) => {
      state.isLoading = false;
    },

    // get all product
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteProduct.rejected]: (state) => {
      state.isLoading = false;
    },

    //search product
    [searchProductByKey.pending]: (state) => {
      state.isLoading = true;
    },
    [searchProductByKey.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [searchProductByKey.rejected]: (state) => {
      state.isLoading = false;
    },

    // get product by id
    [getProductById.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    [getProductById.rejected]: (state) => {
      state.isLoading = false;
    },
    // get product by id
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the generated action creators
export const productActions = ProductSilce.actions;

export default ProductSilce.reducer;
