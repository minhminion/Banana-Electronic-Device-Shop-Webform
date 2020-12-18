import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_IMG_URL } from "../../../../config";

const MenuCart = ({ cartData, currency, deleteFromCart, isSigned }) => {
  let cartTotalPrice = 0;


  if (!isSigned) {
    return (
      <div className="shopping-cart-content">
        <p className="text-center">Vui lòng đăng nhập</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const finalDiscountedPrice =
                single.afterDiscountPrice * currency.currencyRate;

              cartTotalPrice += finalDiscountedPrice * single.quantity;

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
                          single.product.productImages &&
                          single.product.productImages.length
                            ? DEFAULT_IMG_URL +
                              single.product.productImages[0].imgLocation.replace(
                                "\\",
                                "/"
                              )
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
                        {`${single.product.name} - loại ${single.tierId}`}
                      </Link>
                    </h4>
                    <h6>Số lượng: {single.quantity}</h6>
                    <span>
                      {finalDiscountedPrice}
                    </span>
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
              Total :{" "}
              <span className="shop-total">
                {cartTotalPrice}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              View currencyRate
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              Checkout
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
