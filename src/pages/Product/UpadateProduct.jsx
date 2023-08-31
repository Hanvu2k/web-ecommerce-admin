import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../api/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../configs/routes";
import Spinning from "../../components/spining/Spinner";

const UpdateProduct = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { product, isLoading, err } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [componentSize, setComponentSize] = useState("default");
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    short_desc: product?.short_desc || "",
    long_desc: product?.long_desc || "",
    price: product?.price || 0,
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

  useEffect(() => {
    const fetChdata = async () => {
      await dispatch(apiConfig.getProductById(productId));
      await dispatch(apiConfig.getCategory());
    };
    fetChdata();
  }, [dispatch, productId]);

  useEffect(() => {
    // Populate formData when product data is available
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        short_desc: product.short_desc || "",
        long_desc: product.long_desc || "",
        price: product.price || 0,
      });
    }
  }, [product]);

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

  const handleProductUpdate = async () => {
    const isValid = validateForm();
    if (isValid) {
      // Perform the update API call here

      await dispatch(
        apiConfig.updateProduct({
          productId: productId,
          productInfo: formData,
        })
      );

      if (!err.success) {
        alert(err.message);
        return;
      }

      alert("Update successfully");
      navigate(routes.allProducts);
    }
  };

  return (
    <Spinning spinning={isLoading}>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div style={{ margin: "16px 0" }}>Update Product</div>
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
              <Input.TextArea
                style={{ marginLeft: "16px", minHeight: "150px" }}
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
              <Input.TextArea
                style={{ marginLeft: "16px", minHeight: "150px" }}
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
              <Button type="primary" onClick={handleProductUpdate}>
                Update
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

export default UpdateProduct;
