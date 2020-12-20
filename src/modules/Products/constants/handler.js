import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsPending,
  setCategories
} from "./actions";
import { fetch } from "../../../common/effects";
import { ENDPOINTS } from "./models";

const handler = (dispatch, props) => ({
  fetchProduct: async (params) => {
    try {
      dispatch(fetchProductsPending());
      const response = await fetch({
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
      const response = await fetch({
        url: ENDPOINTS.getSingleProduct(productId),
        method: "GET",
      });
      if (response.data && response.status === 200) {
        return response.data.data;
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  },

  // Product Categories
  getProductCategories: async () => {
    try {
      const response = await fetch({
        url: ENDPOINTS.apiCategories,
        method: "GET",
      });
      console.log('======== Bao Minh ~ file: handler.js ~ line 54 ~ getProductCategories: ~ response', response)
      if (response.data && response.status === 200) {
        return dispatch(setCategories(response.data.data));
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
});

export default handler