import React, { useEffect, useState } from "react";
import { Button, Form, Select, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../configs/routes";
import Spinning from "../../components/spining/Spinner";

const UpdateUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { user, isLoading } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.role);

  const [userRole, setUserRole] = useState(user?.role || 0);

  const { userId } = useParams();

  useEffect(() => {
    dispatch(apiConfig.getUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setUserRole(user?.role || 0);
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(apiConfig.getRole());
  }, [dispatch]);

  const handleChangeRole = async () => {
    await dispatch(
      apiConfig.updateRoleUser({ userId: userId, role: userRole })
    );

    alert("Updated role user successfully");

    navigate(routes.user);
  };

  return (
    <Spinning spinning={isLoading}>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div style={{ margin: "16px 0" }}>Update User Role</div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
          <div style={{ margin: "16px 0" }}>Update user: {user?.fullName}</div>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Role">
              <Select
                style={{ marginLeft: "16px" }}
                value={userRole}
                onChange={(value) => setUserRole(value)}
              >
                {role?.map((item) => (
                  <Select.Option key={item._id} value={item.level}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleChangeRole}
                style={{ marginLeft: "60px" }}
                type="primary"
              >
                Update
              </Button>
              <Button
                style={{
                  marginLeft: "16px",
                  backgroundColor: "#22CA80",
                  color: "white",
                }}
                type="primary"
                onClick={() => navigate(routes.user)}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Spinning>
  );
};

export default UpdateUser;
