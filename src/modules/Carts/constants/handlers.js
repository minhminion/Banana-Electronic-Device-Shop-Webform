import {
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
  decreaseQuantity,
} from "./actions";
import { checkError, notify } from "../../../common/helpers/Notify";

const handler = (dispatch, props) => ({
  addToCart: async (item, quantityCount, isCombos) => {
    try {
      notify({
        message: "Đã thêm sản phầm vào giỏ",
        type: "success",
      });
      dispatch(
        addToCart({
          quantity: quantityCount,
          productId: item.id,
          product: item,
          isCombos,
        })
      );
    } catch (error) {
      console.log(
        "======== Bao Minh ~ file: handlers.js ~ line 30 ~ addToCart: ~ error",
        error
      );
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Lỗi không xác định !");
      }
    }
  },
  decreaseQuantity: (item) => {
    dispatch(decreaseQuantity(item));
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
  },
});

export default handler;
