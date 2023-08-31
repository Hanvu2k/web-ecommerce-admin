import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import Spinning from "../../components/spining/Spinner";
import routes from "../../configs/routes";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [componentSize, setComponentSize] = useState("default");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
    price: 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
    price: "",
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { isLoading, category } = useSelector((state) => state.category);
  const { isLoading: addLoading, err } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(apiConfig.getCategory());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Product Name is required";
    }
    if (!formData.category) {
      errors.category = "Category is required";
    }
    if (!formData.short_desc) {
      errors.short_desc = "Short Description is required";
    }
    if (!formData.long_desc) {
      errors.long_desc = "Long Description is required";
    }
    if (formData.price <= 0) {
      errors.price = "Price must be greater than 0";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProductSubmit = async () => {
    if (user?.user?.role === 1) {
      alert("You not allowed to do this");
      return;
    }

    const isValid = validateForm();
    if (isValid) {
      // Perform the form submission or API call here
      // Reset form after successful submission if needed
      await dispatch(apiConfig.createProduct(formData));

      if (!err.success) {
        alert(err.message);
        return;
      }
      alert("Add product success!");
      navigate(routes.allProducts);
      setFormData({
        name: "",
        category: "",
        short_desc: "",
        long_desc: "",
        price: 0,
      });
      setFormErrors({});
    }
  };

  return (
    <Spinning spinning={isLoading || addLoading}>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div style={{ margin: "16px 0" }}>Add Product</div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
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
            <Form.Item
              label="Product Name"
              validateStatus={formErrors.name ? "error" : ""}
              help={formErrors.name}
            >
              <Input
                style={{ marginLeft: "16px" }}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Category"
              validateStatus={formErrors.category ? "error" : ""}
              help={formErrors.category}
            >
              <Select
                style={{ marginLeft: "16px" }}
                value={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                {category?.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Short Description"
              validateStatus={formErrors.short_desc ? "error" : ""}
              help={formErrors.short_desc}
            >
              <Input
                style={{ marginLeft: "16px" }}
                value={formData.short_desc}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    short_desc: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Long Description"
              validateStatus={formErrors.long_desc ? "error" : ""}
              help={formErrors.long_desc}
            >
              <Input
                style={{ marginLeft: "16px" }}
                value={formData.long_desc}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    long_desc: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Price"
              validateStatus={formErrors.price ? "error" : ""}
              help={formErrors.price}
            >
              <InputNumber
                style={{ marginLeft: "16px" }}
                min={0}
                value={formData.price}
                onChange={(value) => setFormData({ ...formData, price: value })}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleProductSubmit}>
                Submit
              </Button>
              <Button
                style={{
                  marginLeft: "16px",
                  backgroundColor: "#22CA80",
                  color: "white",
                }}
                type="primary"
                onClick={() => navigate(routes.allProducts)}
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

export default AddProduct;
