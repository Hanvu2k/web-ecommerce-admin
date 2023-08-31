import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the message slice
const initialMessageUPState = { messages: [] };

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageUPState,
  reducers: {
    getMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

// Export the action creators generated by the messageSlice
export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
