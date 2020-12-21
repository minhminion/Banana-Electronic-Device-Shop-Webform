import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { defaultCurrency } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { multilanguage } from "redux-multilanguage";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { DEFAULT_IMG_URL } from "../../configs";
import { ENUMS } from "../../../constant";
import { Rate } from "antd";

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  cartItem,
  wishlistItem,
  sliderClassName,
  spaceBottomClass,
  strings,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const cartId = useSelector((state) =>
    state.user.user && state.user.user.customer
      ? state.user.user.customer.cart.id
      : null
  );
  // THIS GET DISCOUNT BY %
  // const discountedPrice = getDiscountPrice(product.salePrice, product.price);
  const discountedPrice = product.salePrice;
  const finalProductPrice = +(product.price * currency.currencyRate);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate);

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={
                  product.productImages && product.productImages.length
                    ? DEFAULT_IMG_URL +
                      product.productImages[0].imgLocation.replace("\\", "/")
                    : process.env.PUBLIC_URL + "/img/products/3.jpg"
                }
                alt=""
              />
              {product.images && product.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="red">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Đã thêm vào giỏ"
                      : "Thêm vào giỏ"
                  }
                  onClick={() => addToWishlist(product)}
                >
                  {wishlistItem ? (
                    <HeartFilled style={{ color: "#DC143C" }} />
                  ) : (
                    <HeartOutlined />
                  )}
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.productTiers && product.productTiers[0].quantity > 0 ? (
                  <button
                    onClick={() => addToCart(product, 1, cartId, product.productTiers[0].id)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined
                        ? "Added to cart"
                        : strings["add_to_cart"]
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? strings["added_to_cart"]
                      : strings["add_to_cart"]}
                  </button>
                ) : (
                  <button disabled className="active">
                    {strings["out_of_stock"]}
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            {/* {rating  >= 0 ? (
              <div className="product-rating">
                <Rate value={rating  }  disabled/>
              </div>
            ) : (
              <div className="product-rating">
                <Rate value={4}  disabled/>
              </div>
            )} */}
            <div className="product-price">
              {product.productTiers &&
                product.productTiers.length &&
                product.productTiers.map((productTier) => (
                  <div key={productTier.id}>
                    <span> Loại {productTier.tierId}:</span>
                    {productTier.discountPercentage > 0 ? (
                      <Fragment>
                        <span className="old">
                          {defaultCurrency(currency, productTier.salePrice)}
                        </span>{" "}
                        <span>
                          {`${defaultCurrency(
                            currency,
                            productTier.afterDiscountPrice
                          )} / ${
                            ENUMS.ProductUnit.find(
                              (item) => item.id === product.productUnit
                            ).content
                          }`}
                        </span>
                      </Fragment>
                    ) : (
                      <span>
                        {`${defaultCurrency(
                          currency,
                          productTier.afterDiscountPrice
                        )} / ${
                          ENUMS.ProductUnit.find(
                            (item) => item.id === product.productUnit
                          ).content
                        }`}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        key={product.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
  strings: PropTypes.object,
};

export default multilanguage(ProductGridSingle);
