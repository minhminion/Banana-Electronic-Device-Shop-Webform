import PropTypes from "prop-types";
import React, { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { defaultCurrency } from "../../helpers/product";
// import ProductModal from "./ProductModal";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { DEFAULT_IMG_URL } from "../../../config";
import { Space, Rate } from "antd";
import { useDispatch } from "react-redux";
import handler from "../../../modules/Carts/constants/handlers";
import ProductModal from "./ProductModal";
import { formatNumberToVND } from "../../helpers";

const ProductGridListSingle = (props) => {
  const {
    cartId,
    product,
    currency,
    addToWishlist,
    cartItem,
    wishlistItem,
    sliderClassName,
    spaceBottomClass,
  } = props
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch()

  const rating = Math.round(
    (product.productTier1AverageRate + product.productTier2AverageRate) / 2
  );

  const { addToCart } = useMemo(() => handler(dispatch, props), [props, dispatch]);


  return (
    <Fragment key={product.id}>
      <div
        className={`col-xl-4 col-sm-6 ${
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
                  src={process.env.PUBLIC_URL + "/img/products/3.jpg"}
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
                  className={wishlistItem !== undefined ? "active" : ""}
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
                {product.quantity && product.quantity > 0 ? (
                  <button
                    onClick={() => addToCart(product, 1, cartId)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined
                        ? "Added to cart"
                        : "Thêm vào giỏ"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Đã thêm vào giỏ"
                      : "Thêm vào giỏ"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Hết hàng
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
              <span>{`${formatNumberToVND(product.price)}đ`}</span>
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    <img
                      className="default-img img-fluid"
                      src={
                        product.productImages && product.productImages.length
                          ? DEFAULT_IMG_URL +
                            product.productImages[0].imgLocation.replace(
                              "\\",
                              "/"
                            )
                          : process.env.PUBLIC_URL + "/img/products/3.jpg"
                      }
                      alt=""
                    />
                    {product.productImages &&
                    product.productImages.length > 1 ? (
                      <img
                        className="hover-img img-fluid"
                        src={
                          DEFAULT_IMG_URL +
                          product.productImages[1].imgLocation.replace(
                            "\\",
                            "/"
                          )
                        }
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
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    {product.name}
                  </Link>
                </h3>
                <div className="product-list-price">
                  <Space direction="vertical">
                    <span>{`${formatNumberToVND(product.price)}đ`}</span>
                  </Space>
                </div>
                {/* {rating  >= 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rate value={rating  }  disabled/>
                    </div>
                  </div>
                ) : (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rate value={4}  disabled/>
                    </div>
                  </div>
                )} */}
                {product.description ? <p>{product.description}</p> : ""}

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {product.quantity && product.quantity > 0 ? (
                      <button
                        key={product.id}
                        onClick={() =>
                          addToCart(
                            product,
                            1,
                          )
                        }
                        className={
                          cartItem !== undefined && cartItem.quantity > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItem !== undefined && cartItem.quantity > 0
                        }
                        title={
                          cartItem !== undefined
                            ? "Added to cart"
                            : "Thêm vào giỏ"
                        }
                      >
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItem !== undefined && cartItem.quantity > 0
                          ? "Đã thêm vào giỏ"
                          : "Thêm vào giỏ"}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Hết hàng
                      </button>
                    )}
                  </div>

                  <div className="shop-list-wishlist ml-10">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        cartItem={cartItem}
        wishlistitem={wishlistItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
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
export default ProductGridListSingle;
