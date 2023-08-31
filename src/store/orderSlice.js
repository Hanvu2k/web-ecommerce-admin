import { createSlice } from "@reduxjs/toolkit";
import { getOrder, getOrderDetailById } from "../api/orderApi";

// Define the initial state for the cartSlice
const initialOrderState = {
  order: [],
  orderDetail: {},
  isLoading: false,
};

const OrderSilce = createSlice({
  name: "products",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: {
    // get order
    [getOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    },
    [getOrder.rejected]: (state) => {
      state.isLoading = false;
    },

    // get order details
    [getOrderDetailById.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderDetailById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderDetail = action.payload;
    },
    [getOrderDetailById.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the generated action creators
export const orderActions = OrderSilce.actions;

export default OrderSilce.reducer;
