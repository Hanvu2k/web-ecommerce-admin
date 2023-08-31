import React, { useEffect } from "react";
import { Space, Table, Button, theme } from "antd";

import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/routes";
import Spinning from "../../components/spining/Spinner";

const User = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(apiConfig.getAllUsers());
    dispatch(apiConfig.getMe());
  }, [dispatch]);

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
      title: "role",
      dataIndex: "role",
      key: "rol",
      render: (role) => {
        return (
          <>
            {role === 0 && <>User</>}
            {role === 1 && <>Consolor</>}
            {role === 2 && <>Admin</>}
          </>
        );
      },
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
            onClick={() => handleMoveToUpdate(id)}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const data = users?.map((user) => {
    return {
      key: user._id,
      id: user._id,
      name: user.fullName,
      role: user.role,
    };
  });

  const handleMoveToUpdate = (id) => {
    if (user?.user?.role === 1) {
      alert("You not allowed to do this");
      return;
    }

    navigate(routes.userEdit.replace(":userId", id));
  };

  return (
    <Spinning spinning={isLoading}>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div style={{ margin: "16px 0" }}>Chat </div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
          <Table columns={columns} dataSource={data} />
        </div>
      </Content>
    </Spinning>
  );
};

export default User;
