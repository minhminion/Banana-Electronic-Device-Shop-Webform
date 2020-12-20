import PropTypes from "prop-types";
import React, { Fragment, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_IMG_URL } from "../../../../config";
import handler from "../../../../modules/Carts/constants/handlers";
import { formatNumberToVND } from "../../../helpers";

const MenuCart = (props) => {
  let cartTotalPrice = 0;
  let cartTotalPriceWithOutCombo = 0;
  const { combo, cartData, isSigned } = props;
  const dispatch = useDispatch();

  const { deleteFromCart } = useMemo(() => handler(dispatch, props), [
    props,
    dispatch,
  ]);

  cartTotalPrice = combo.reduce(
    (value, item) => value + item.comboPrice * item.quantity,
    0
  );

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const finalDiscountedPrice = single.unitPrice;
              if (!single.comboId) {
                cartTotalPrice += single.totalPrice;
              }
              cartTotalPriceWithOutCombo += single.totalPrice

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link
                      to={
                        process.env.PUBLIC_URL + "/product/" + single.productId
                      }
                    >
                      <img
                        alt=""
                        src={
                          single.product?.productImages
                            ? DEFAULT_IMG_URL +
                              single.product.productImages.replace("\\", "/")
                            : process.env.PUBLIC_URL + "/img/products/3.jpg"
                        }
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          "/product/" +
                          single.productId
                        }
                      >
                        {`${single.product?.name}`}
                      </Link>
                    </h4>
                    {single.comboId && <h6>Combo: {single.comboId}</h6>}
                    <h6>Số lượng: {single.quantity}</h6>
                    <span>{`${formatNumberToVND(finalDiscountedPrice)}đ`}</span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Tổng sản phẩm :{" "}
              <span className="shop-total">
                {`${formatNumberToVND(cartTotalPriceWithOutCombo)}đ`}
              </span>
            </h4>
            <h4>
              Tổng tiền :{" "}
              <span className="shop-total">
                {`${formatNumberToVND(cartTotalPrice)}đ`}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Xem giỏ hàng
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              Thanh toán
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Không có sản phẩm trong giỏ hàng</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

export default MenuCart;
