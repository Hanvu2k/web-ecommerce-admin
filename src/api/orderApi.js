import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

export const getOrder = createAsyncThunk("/order/getOrder", async () => {
  try {
    const res = await axiosClient.get("/order/getAllOrder");
    return res.order;
  } catch (error) {
    console.log(error);
  }
});

export const getOrderDetailById = createAsyncThunk(
  "/order/getOrderDetail",
  async (orderId) => {
    try {
      const res = await axiosClient.get(
        `/order/getOrderDetail?orderId=${orderId}`
      );
      return res.orderDetail;
    } catch (error) {
      console.log(error);
    }
  }
);
