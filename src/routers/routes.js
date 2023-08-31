import routes from "../configs/routes";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import { AddProduct, AllProduct, UpdateProduct } from "../pages/Product";
import { Chat } from "../pages/chats";

import { DashBoard } from "../pages/dashBoard";
import { Login } from "../pages/login";
import { User, UpdateUser } from "../pages/user";

// Define an array of public routes
const publicRoutes = [
  {
    path: routes.userEdit,
    component: <UpdateUser />,
    name: "userEdit",
  },
  {
    path: routes.user,
    component: <User />,
    name: "user",
  },
  {
    path: routes.chat,
    component: <Chat />,
    name: "chat",
  },
  {
    path: routes.updateProduct,
    component: <UpdateProduct />,
    name: "updateProduct",
  },
  {
    path: routes.addProduct,
    component: <AddProduct />,
    name: "addProduct",
  },
  {
    path: routes.login,
    component: <Login />,
    name: "login",
  },
  {
    path: routes.addProduct,
    component: <div>Not Pages</div>,
    name: "addproduct",
  },
  {
    path: routes.allProducts,
    component: <AllProduct />,
    name: "allproduct",
  },
  {
    path: routes.dashBoard,
    component: <DashBoard />,
    name: "dashboard",
  },
  {
    path: routes.orderDetails,
    component: <OrderDetail />,
    name: "order",
  },
  {
    path: "/*", // Wildcard path for any other pages
    component: <div>Not Pages</div>, // Component to render for unknown pages
    name: "Oh! Not Pages", // Name of the route
  },
];

export { publicRoutes };
