import {
  loginUser,
  getMe,
  getAllUsers,
  getUserById,
  updateRoleUser,
  logout,
} from "./userApi";
import {
  getAllProduct,
  searchProductByKey,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} from "./productApi";
import { getOrder, getOrderDetailById } from "./orderApi";
import { getCategory } from "./categoryApi";
import { getRole } from "./roleApi";

const apiConfig = {
  // user
  loginUser,
  getMe,
  getAllUsers,
  getUserById,
  updateRoleUser,
  logout,
  //   product
  getAllProduct,
  searchProductByKey,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  //   order
  getOrder,
  getOrderDetailById,
  //  category
  getCategory,
  //role
  getRole,
};

export default apiConfig;
