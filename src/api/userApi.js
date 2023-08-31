import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";
import { setToken } from "../utils/token";

export const loginUser = createAsyncThunk("user/login", async (userInfo) => {
  try {
    const res = await axiosClient.post("/auth/loginAdmin", userInfo);

    if (res.success) {
      setToken(res.user.token, res.user);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getMe = createAsyncThunk("user/getMe", async () => {
  try {
    const res = await axiosClient.get("/auth/me");

    if (res?.success) {
      setToken(res.user.token, res.user);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    try {
      const res = await axiosClient.get(`/auth/getUserById?userId=${userId}`);

      return res.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllUsers = createAsyncThunk("user/getAllUser", async () => {
  try {
    const res = await axiosClient.get("/auth/allUser");

    return res.users;
  } catch (error) {
    console.log(error);
  }
});

export const updateRoleUser = createAsyncThunk(
  "user/updateRoleUser",
  async ({ userId, role }) => {
    try {
      const res = await axiosClient.patch("/auth/updateRole", { userId, role });

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const res = await axiosClient.post("/auth/logout");

    return res;
  } catch (error) {
    console.log(error);
  }
});
