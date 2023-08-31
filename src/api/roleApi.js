import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

export const getRole = createAsyncThunk("role/getRole", async () => {
  try {
    const res = await axiosClient.get("role/getRole");

    return res.role;
  } catch (error) {
    console.log(error);
  }
});
