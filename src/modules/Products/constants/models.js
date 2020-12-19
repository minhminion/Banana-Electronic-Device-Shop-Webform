import { DEFAULT_API_URL } from "../../../config";

export const MODULE_NAME = "products";

export const ENDPOINTS = {
  getProducts: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  getSingleProduct:(productId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${productId}`,

  apiCategories: `${DEFAULT_API_URL}/categories`,
};
