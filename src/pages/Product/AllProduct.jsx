import { Content } from "antd/es/layout/layout";
import { Space, Table, Button, theme } from "antd";

import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/routes";
import formatNumber from "../../utils/formatNumber";
import Spinning from "../../components/spining/Spinner";
import { DebounceInput } from "react-debounce-input";

function AllProduct() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { products, isLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(apiConfig.getAllProduct());
    dispatch(apiConfig.getMe());
  }, [dispatch]);

  const handlEditProduct = (id) => {
    if (user?.user?.role === 1) {
      alert("You not allowed to do this");
      return;
    }

    navigate(routes.updateProduct.replace(":productId", id));
  };

  const handlDeleteProduct = async (id) => {
    if (user?.user?.role === 1) {
      alert("You not allowed to do this");
      return;
    }

    await dispatch(apiConfig.deleteProduct(id));
    await dispatch(apiConfig.getAllProduct());
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <>{formatNumber(price)} VND</>,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (imageUrl) => (
        <img src={imageUrl} alt="User" style={{ width: "60px" }} />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{
              backgroundColor: "#22CA80",
              color: "white",
            }}
            onClick={() => handlEditProduct(id)}
          >
            Update
          </Button>
          <Button type="primary" danger onClick={() => handlDeleteProduct(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const searchProduct = products?.filter((product) =>
    product?.name?.toLowerCase().includes(search?.toLowerCase())
  );

  const data1 = searchProduct?.map((product) => {
    return {
      key: product._id,
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.img,
    };
  });

  const data2 = products?.map((product) => {
    return {
      key: product._id,
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.img,
    };
  });

  return (
    <Spinning spinning={isLoading}>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div style={{ margin: "16px 0" }}>All Product</div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
          <div className="search-product">
            <label htmlFor="product">Products</label>
            <DebounceInput
              minLength={1}
              debounceTimeout={500}
              type="text"
              name="product"
              id="product"
              placeholder="Enter Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Table
            columns={columns}
            dataSource={searchProduct?.length > 0 ? data1 : data2}
          />
        </div>
      </Content>
    </Spinning>
  );
}

export default AllProduct;
