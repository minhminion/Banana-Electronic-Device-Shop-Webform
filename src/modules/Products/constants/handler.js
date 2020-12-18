import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsPending,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

const handler = (dispatch, props) => ({
  fetchProduct: async (params) => {
    try {
      dispatch(fetchProductsPending());
      const response = await fetchAuth({
        url: ENDPOINTS.getProducts,
        method: "GET",
        params: {
          ...params,
        },
      });
      if (response.data && response.status === 200) {
        dispatch(fetchProductsSuccess(response.data.data));
        return response.data.data
      } else {
        dispatch(fetchProductsFailure("Lỗi không xác định !"));
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error?.response?.data?.ApiErr));
    }
  },
  fetchSingleProduct: async (productId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getSingleProduct(productId),
        method: "GET",
      });
      if (response.data && response.status === 200) {
        return response.data.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data?.ApiErr;
    }
  },

  // Product Categories
  getProductCategories: async () => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductCategories,
        method: "GET",
      });
      if (response.data && response.status === 200) {
        return response.data.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
});

export default handler