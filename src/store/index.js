import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./categorySlice";
import messageReducer from "./messageSilce";
import roleReducer from "./roleSilce";

// Create the Redux store with combined reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer,
    message: messageReducer,
    role: roleReducer,
  },
});

export default store;
