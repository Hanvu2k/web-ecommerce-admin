import React, { useEffect } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  PlusSquareOutlined,
  AppstoreAddOutlined,
  RollbackOutlined,
  WechatOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Outlet, useMatch } from "react-router-dom";
import routes from "../configs/routes";
import SubMenu from "antd/es/menu/SubMenu";
import { Login } from "../pages/login";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import apiConfig from "../api/apiConfig";

const { Header, Footer, Sider } = Layout;
const LayoutPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.user);

  const isLogin = useMatch(routes.login);

  useEffect(() => {
    const featchData = async () => {
      await dispatch(apiConfig.getMe());
    };
    featchData();
  }, [dispatch]);

  useEffect(() => {
    // Redirect to home page if the user is already authenticated
    if (!isAuth) {
      return navigate(routes.login);
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(userActions.logoutHandler());
    dispatch(apiConfig.logout());
    navigate(routes.login);
  };

  if (isLogin) return <Login />;

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div
            style={{
              padding: "16px 0",
              color: "#ffffffa6",
              textAlign: "center",
            }}
          >
            Admin Wecommerce
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item
              key="dashBoard"
              icon={<BarChartOutlined />}
              onClick={() => navigate(routes.dashBoard)}
            >
              Dashboard
            </Menu.Item>
            <SubMenu title="Product" key="product" icon={<AppstoreOutlined />}>
              <Menu.Item
                key="product1"
                icon={<AppstoreAddOutlined />}
                onClick={() => navigate(routes.allProducts)}
              >
                All Product
              </Menu.Item>
              <Menu.Item
                key="product2"
                icon={<PlusSquareOutlined />}
                onClick={() => navigate(routes.addProduct)}
              >
                Add Product
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="chat"
              icon={<WechatOutlined />}
              onClick={() => navigate(routes.chat)}
            >
              Chat
            </Menu.Item>
            <Menu.Item
              key="user"
              icon={<UserOutlined />}
              onClick={() => navigate(routes.user)}
            >
              User
            </Menu.Item>

            <Menu.Item
              key="logout"
              icon={<RollbackOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          ></Header>
          <Outlet />
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            ©2023 Created by hanvu2k
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutPage;
