import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";
// get all product
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    try {
      const res = await axiosClient.get(`category/getCategory`);
      return res.category;
    } catch (error) {
      console.log(error);
    }
  }
);
