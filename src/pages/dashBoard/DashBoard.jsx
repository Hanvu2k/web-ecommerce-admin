import React, { useEffect } from "react";
import { Space, Table, Button, Layout, theme } from "antd";
import {
  DollarOutlined,
  FileAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/routes";
import formatNumber from "../../utils/formatNumber";
import Spinning from "../../components/spining/Spinner";

const { Content } = Layout;

function DashBoard() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { order, isLoading } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiConfig.getOrder());
  }, [dispatch]);

  const handleViewDetail = (id) => {
    navigate(routes.orderDetails.replace(":orderId", id));
  };

  const columns = [
    {
      title: "ID User",
      dataIndex: "idUser",
      key: "idUser",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      key: "delivery",
      render: (delivery) => (
        <>{delivery === "wfprg" && "Waiting for progressing"}</>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <>{status === "wfp" && "Waiting for pay"}</>,
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (detail) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{
              backgroundColor: "#22CA80",
              color: "white",
            }}
            onClick={() => handleViewDetail(detail)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const data = order?.map((item) => {
    return {
      key: item.id,
      detail: item.id,
      idUser: item.user,
      name: item.name,
      phone: `0${item.phoneNumber}`,
      address: item.address,
      total: item.total,
      delivery: item.delivery,
      status: item.status,
    };
  });

  // Calculate the number of unique users
  const uniqueUsers = new Set(order?.map((order) => order.user)).size;

  // Calculate the total of all orders
  const totalAllOrders = order?.reduce(
    (total, order) => total + order.total,
    0
  );
  // Calculate the number of orders
  const numberOfOrders = order?.length;

  return (
    <div>
      <div style={{ margin: "24px 16px 0" }}>DashBoard</div>
      <Spinning spinning={isLoading}>
        <Content
          className="dashboard-top"
          style={{
            margin: "24px 16px",
            background: colorBgContainer,
          }}
        >
          <div className="dashBoard-item">
            <div className="dashBoard-content">
              <h3>{uniqueUsers}</h3>
              <div>Clients</div>
            </div>
            <div className="dashBoard-icon">
              <UserAddOutlined />
            </div>
          </div>
          <div className="dashBoard-item">
            <div className="dashBoard-content">
              <h3>
                {formatNumber(totalAllOrders)}{" "}
                <sup style={{ fontSize: "14px" }}>VND</sup>
              </h3>
              <div>Earnings of Month</div>
            </div>
            <div className="dashBoard-icon">
              <DollarOutlined />
            </div>
          </div>
          <div className="dashBoard-item">
            <div className="dashBoard-content">
              <h3>{numberOfOrders}</h3>
              <div>New Order</div>
            </div>
            <div className="dashBoard-icon">
              <FileAddOutlined />
            </div>
          </div>
        </Content>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <h3 style={{ padding: "16px 0" }}>History</h3>
            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
      </Spinning>
    </div>
  );
}

export default DashBoard;
