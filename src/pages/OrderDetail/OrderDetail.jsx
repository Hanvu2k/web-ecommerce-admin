import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "./OrderDetail.css";
import apiConfig from "../../api/apiConfig";
import formatNumber from "../../utils/formatNumber";
import routes from "../../configs/routes";
import { Content } from "antd/es/layout/layout";
import { theme } from "antd";
import Spinning from "../../components/spining/Spinner";

function OrderDetail() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { orderDetail, isLoading } = useSelector((state) => state.order);
  const token = localStorage.getItem("jwt");
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page if the user is already authenticated
    if (!token) {
      navigate(routes.home);
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(apiConfig.getOrderDetailById(orderId));
  }, [dispatch, orderId]);

  const { address, name, user, total, products, phoneNumber } = orderDetail;

  return (
    <Spinning spinning={isLoading}>
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
          <div className="user-info" style={{ margin: "16px 0" }}>
            <h2 className="order-title ">information order</h2>
            <div className="user-info-detail">ID User: {user}</div>
            <div className="user-info-detail">Full Name: {name}</div>
            <div className="user-info-detail">Phone: 0{phoneNumber}</div>
            <div className="user-info-detail">Address: {address}</div>
            <div className="user-info-detail">
              Total: {formatNumber(total)} VND
            </div>
          </div>
          <div className="py-4"></div>
          <div className="product-info" style={{ margin: "16px 0" }}>
            <table>
              <thead className="table-head">
                <tr className="table-head-content">
                  <td className="table-head-item">id product</td>
                  <td className="table-head-item">image</td>
                  <td className="table-head-item">name</td>
                  <td className="table-head-item">price</td>
                  <td className="table-head-item">count</td>
                </tr>
              </thead>
              <tbody className="table-body">
                {products?.map((product) => {
                  return (
                    <tr
                      key={product.product_id._id}
                      className="table-body-content"
                    >
                      <td className="table-body-item">
                        {product.product_id._id}
                      </td>
                      <td className="table-body-item">
                        <img
                          src={product.product_id.photos[0]}
                          alt={product.product_id.name}
                        />
                      </td>
                      <td className="table-body-item">
                        {product.product_id.name}
                      </td>
                      <td className="table-body-item">
                        {formatNumber(product.product_id.price)} VND
                      </td>
                      <td className="table-body-item">{product.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Content>
    </Spinning>
  );
}

export default OrderDetail;
