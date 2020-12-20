import {
  addToCard,
  deleteFromCart,
  deleteAllFromCart,
  decreaseQuantity,
  addAllToCard,
} from "./actions";
import { fetch } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { checkError, notify } from "../../../common/helpers/Notify";

const handler = (dispatch, props) => ({
  addToCart: async (item, quantityCount, isIncreases) => {
    try {
      if (!isIncreases) {
        notify({
          message: "Đã thêm sản phầm vào giỏ",
          type: "success",
        });
      }
      dispatch(
        addToCard({
          quantity: quantityCount,
          productId: item.id,
          product: item,
        })
      );
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
    }
  },
  decreaseQuantity: (item) => {
    dispatch(decreaseQuantity(item))
  },

  deleteFromCart: (item) => {
    notify({
      message: "Xóa sản phẩm thành công",
      type: "success",
    });
    dispatch(deleteFromCart(item));
  },
  deleteAllFromCart: () => {
    notify({
      message: "Đã xóa tất sản phẩm",
      type: "success",
    });
    dispatch(deleteAllFromCart());
  }
});

export default handler;
