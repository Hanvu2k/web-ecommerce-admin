import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getMe, getAllUsers, getUserById } from "../api/userApi";
import { removeToken } from "../utils/token";

// Define the initial state for the cartSlice
const initialUserState = {
  isLoading: false,
  users: [],
  user: {},
  err: {},
  isAuth: "",
};

const UserSilce = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    // Action handler for logout
    logoutHandler() {
      // Remove the current user from localStorage, save updated state, and reload the page
      removeToken();
      window.location.reload();
    },
  },
  extraReducers: {
    // login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;

      if (!action.payload.success) {
        state.err = action.payload;
      } else {
        state.isAuth = action.payload.user?.token;
        state.user = action.payload.user;
      }
    },
    [loginUser.rejected]: (state) => {
      state.isLoading = false;
    },

    // get user info
    [getMe.pending]: (state) => {
      state.isLoading = true;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = action.payload?.user?.token;
    },
    [getMe.rejected]: (state) => {
      state.isLoading = false;
    },

    // get user by id
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUserById.rejected]: (state) => {
      state.isLoading = false;
    },

    // get all user
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the generated action creators
export const userActions = UserSilce.actions;

export default UserSilce.reducer;
