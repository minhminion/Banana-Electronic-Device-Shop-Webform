import PropTypes from "prop-types";
import React, { Fragment, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { MODULE_NAME } from "./constants/models";
import Breadcrumb from "../../common/wrappers/Breadcrumb";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_IMG_URL } from "../../config";
import handler from "./constants/handlers";
import { formatNumberToVND } from "../../common/helpers";

const Cart = (props) => {
  const dispatch = useDispatch();

  const [quantityCount] = useState(1);
  const { pathname } = useLocation();
  let cartTotalPrice = 0;
  let cartTotalPriceWithOutCombo = 0

  const {
    addToCart,
    decreaseQuantity,
    deleteFromCart,
    deleteAllFromCart,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const { combo, details: cartItems } = useSelector(
    (state) => state[MODULE_NAME]
  );

  cartTotalPrice = combo.reduce((value, item) => value + (item.comboPrice * item.quantity), 0);

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Giỏ hàng</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Giỏ hàng
      </BreadcrumbsItem>
      <Breadcrumb />
      <div className="cart-main-area pt-90 pb-100">
        <div className="container">
          {cartItems && cartItems.length >= 1 ? (
            <Fragment>
              <h3 className="cart-page-title">Giỏ hàng của bạn</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Hình ảnh</th>
                          <th>Tên SP</th>
                          <th>Đơn giá(đ)</th>
                          <th>Số lượng</th>
                          <th>Tổng(đ)</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cartItem, key) => {
                          if (!cartItem.comboId) {
                            cartTotalPrice += cartItem.totalPrice;
                          }
                          cartTotalPriceWithOutCombo += cartItem.totalPrice

                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product/" +
                                    cartItem.productId
                                  }
                                >
                                  <img
                                    className="img-fluid"
                                    src={
                                      cartItem.product &&
                                      cartItem.product.productImages &&
                                      cartItem.product.productImages.length
                                        ? DEFAULT_IMG_URL +
                                          cartItem.product.productImages[0].imgLocation.replace(
                                            "\\",
                                            "/"
                                          )
                                        : process.env.PUBLIC_URL +
                                          "/img/products/3.jpg"
                                    }
                                    alt=""
                                  />
                                </Link>
                              </td>

                              <td className="product-name">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product/" +
                                    cartItem.productId
                                  }
                                >
                                  {`${cartItem.product && cartItem.product.name}
                                  ${
                                    cartItem.comboId
                                      ? ` (Combo ${cartItem.comboId})`
                                      : ""
                                  }`}
                                </Link>
                              </td>

                              <td className="product-price-cart">
                                <span className="amount">
                                  {formatNumberToVND(cartItem.unitPrice)}
                                </span>
                              </td>

                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                    className="dec qtybutton"
                                    onClick={() => decreaseQuantity(cartItem)}
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={cartItem.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      addToCart(
                                        cartItem.product,
                                        quantityCount,
                                        cartItem.comboId
                                      )
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantity &&
                                      cartItem.quantity >=
                                        cartItem.product.quantity
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                {formatNumberToVND(cartItem.totalPrice)}
                              </td>

                              <td className="product-remove">
                                <button
                                  onClick={() => deleteFromCart(cartItem)}
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Tiếp tuc mua hàng
                      </Link>
                    </div>
                    <div className="cart-clear">
                      <button onClick={() => deleteAllFromCart()}>
                        Xóa giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grand-totall">
                  <Row gutter={50}>
                    <Col span={12}>
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Phiếu mua hàng
                        </h4>
                      </div>
                      <h5>
                        Tổng sản phẩm{" "}
                        <span>{`${formatNumberToVND(cartTotalPriceWithOutCombo)}đ`}</span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Tổng cộng{" "}
                        <span>{`${formatNumberToVND(cartTotalPrice)}đ`}</span>
                      </h4>
                    </Col>
                    <Col span={12}>
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Tổng giỏ hàng
                        </h4>
                      </div>
                      <h5>
                        Tổng sản phẩm{" "}
                        <span>{`${formatNumberToVND(cartTotalPriceWithOutCombo)}đ`}</span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Tổng cộng{" "}
                        <span>{`${formatNumberToVND(cartTotalPrice)}đ`}</span>
                      </h4>
                    </Col>
                  </Row>
                  <Link to={process.env.PUBLIC_URL + "/checkout"}>
                    Tiến hành thanh toán
                  </Link>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="item-empty-area__text">
                    Không có sản phẩm trong giỏ <br />{" "}
                    <Link to={process.env.PUBLIC_URL + "/shop"}>Mua ngay</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

export default Cart;
