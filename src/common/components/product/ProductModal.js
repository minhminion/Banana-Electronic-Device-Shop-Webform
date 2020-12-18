import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { getProductCartQuantity, defaultCurrency } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect, useSelector } from "react-redux";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ENUMS } from "../../../constant";
import { multilanguage } from "redux-multilanguage";
import { DEFAULT_IMG_URL } from "../../configs";
import { Checkbox, Space, Rate } from "antd";

function ProductModal({
  product,
  currency,
  discountedprice,
  finaldiscountedprice,
  finalproductprice,
  strings,
  wishlistItem,
  addtocart,
  ...props
}) {
  const cartId = useSelector((state) =>
    state.user.user && state.user.user.customer
      ? state.user.user.customer.cart.id
      : null
  );

  const rating = Math.round((product.productTier1AverageRate+product.productTier2AverageRate)/2)

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [quantityCount, setQuantityCount] = useState(1);

  const [selectedTier, setSelectedTier] = useState(product.productTiers[0].id);
  const [productQuantity, setProductStock] = useState(
    product.productTiers ? product.productTiers[0].quantity : 1
  );

  const addToCart = (product, quantityCount, cartId, selectedTier) => {
    setQuantityCount(1);
    addtocart(product, quantityCount, cartId, selectedTier);
    props.onHide();
  };
  const addToWishlist = props.addtowishlist;

  const cartItems = props.cartitems;

  const productCartQty = getProductCartQuantity(cartItems, product);

  const handleSelectTier = (e) => {
    setSelectedTier(e.target.value);
    setProductStock(
      product.productTiers &&
        product.productTiers.find((item) => item.id === e.target.value).quantity
    );
  };

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.productImages && product.productImages.length ? (
                    product.productImages.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={
                                single && single.imgLocation
                                  ? DEFAULT_IMG_URL +
                                    single.imgLocation.replace("\\", "/")
                                  : process.env.PUBLIC_URL +
                                    "/img/products/3.jpg"
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div key={1}>
                      <div className="single-image">
                        <img
                          src={process.env.PUBLIC_URL + "/img/products/3.jpg"}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.productImages && product.productImages.length
                    ? product.productImages.map((single, key) => {
                        return (
                          <div key={key}>
                            <div className="single-image">
                              <img
                                src={
                                  single && single.imgLocation
                                    ? DEFAULT_IMG_URL +
                                      single.imgLocation.replace("\\", "/")
                                    : process.env.PUBLIC_URL +
                                      "/img/products/3.jpg"
                                }
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  <Space direction="vertical">
                    {product.productTiers &&
                      product.productTiers.length &&
                      product.productTiers.map((productTier) => (
                        <div key={productTier.id}>
                          <Checkbox
                            value={productTier.id}
                            checked={selectedTier === productTier.id}
                            onChange={handleSelectTier}
                          />
                          <span> Loại {productTier.tierId}:</span>
                          {productTier.discountPercentage > 0 ? (
                            <>
                              <span className="old">
                                {defaultCurrency(
                                  currency,
                                  productTier.salePrice
                                )}
                              </span>
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
                            </>
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
                  </Space>
                </div>
                {/* {rating  >= 0 ? (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rate value={4} disable />
                    </div>
                  </div>
                ) : (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rate value={4} disable />
                    </div>
                  </div>
                )} */}
                <div className="pro-details-list">
                  <p>{product.description}</p>
                </div>
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount <
                            Math.floor(productQuantity) - productCartQty
                            ? quantityCount + 1
                            : quantityCount
                        )
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    {productQuantity && Math.floor(productQuantity) > 0 ? (
                      <button
                        onClick={() => {
                          addToCart(
                            product,
                            quantityCount,
                            cartId,
                            selectedTier
                          );
                        }}
                        disabled={productCartQty >= productQuantity}
                      >
                        {productCartQty >= productQuantity
                          ? "Out of Stock"
                          : strings["add_to_cart"]}
                      </button>
                    ) : (
                      <button disabled>Out of Stock</button>
                    )}
                  </div>
                  <div className="pro-details-wishlist">
                    <button
                      disabled={wishlistItem !== undefined}
                      title={
                        wishlistItem !== undefined
                          ? "Added to wishlist"
                          : "Add to wishlist"
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
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartitems: state.cart,
  };
};

export default connect(mapStateToProps)(multilanguage(ProductModal));
