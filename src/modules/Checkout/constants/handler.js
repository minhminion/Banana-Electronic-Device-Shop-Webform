import { fetchAuth } from "../../../common/effects";
import { deleteAllFromCart } from "../../Carts/constants/actions";
import {
  createOrderFailure,
  createOrderSuccess,
  loadingOrder,
} from "./actions";
import { ENDPOINTS } from "./models";

const handler = (dispatch, props) => ({
  creatOrder: async (order) => {
    try {
      dispatch(loadingOrder());
      const response = await fetchAuth({
        url: ENDPOINTS.createOrder,
        method: "POST",
        data: order,
      });
      if (response.data && response.status === 201) {
        dispatch(deleteAllFromCart())
        dispatch(createOrderSuccess());
        return response.data
      } else {
        dispatch(
          createOrderFailure({
            ApiErr: "Lỗi không xác định",
          })
        );
      }
    } catch (error) {
      if (error.response?.data) {
        dispatch(createOrderFailure(error.response.data));
      } else {
        createOrderFailure({
          ApiErr: "Lỗi không xác định",
        });
      }
    }
  },
});

export default handler;
