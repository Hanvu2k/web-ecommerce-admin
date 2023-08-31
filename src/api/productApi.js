import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";
// get all product
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const res = await axiosClient.get(`product/getAllProducts`);
      return res.products;
    } catch (error) {
      console.log(error);
    }
  }
);

// search product
export const searchProductByKey = createAsyncThunk(
  "product/searchProduct",
  async (searchTerm) => {
    try {
      const res = await axiosClient.get(
        `product/searchProduct?searchTerm=${searchTerm}`
      );
      return res.products;
    } catch (error) {
      console.log(error);
    }
  }
);

// create product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productInfo) => {
    try {
      const res = await axiosClient.post(`product/createProduct`, productInfo);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
// delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    try {
      const res = await axiosClient.delete(
        `product/deleteProduct?productId=${productId}`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

// get product by id
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId) => {
    try {
      const res = await axiosClient.get(
        `product/getProductByIdAdmin/${productId}`
      );

      return res.product;
    } catch (error) {
      console.log(error);
    }
  }
);

// update product by id
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    try {
      const res = await axiosClient.patch(
        `product/updateProduct?productId=${product.productId}`,
        product.productInfo
      );
      return res.product;
    } catch (error) {
      console.log(error);
    }
  }
);
