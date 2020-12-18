import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import { DEFAULT_IMG_URL } from "../../configs";
import { ENUMS } from "../../../constant";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
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

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      1200: {
        slidesPerView: 4,
        direction: "vertical",
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      320: {
        slidesPerView: 4,
        direction: "horizontal",
      },
    },
  };
  
  return (
    <Fragment>
      <div className="row row-5">
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10"
          }`}
        >
          <div className="product-large-image-wrapper">
            {product.discount || product.status ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="red">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.status === ENUMS.ProductStatus.NewGoodsImported ? <span className="purple">Mới</span> : ""}
              </div>
            ) : (
              ""
            )}
            <LightgalleryProvider>
              <Swiper {...gallerySwiperParams}>
                {product.productImages && product.productImages.length ? (
                  product.productImages.map((single, key) => {
                    return (
                      <div key={key}>
                        <LightgalleryItem
                          group="any"
                          src={DEFAULT_IMG_URL + single.imgLocation}
                        >
                          <button>
                            <i className="pe-7s-expand1"></i>
                          </button>
                        </LightgalleryItem>
                        <div className="single-image">
                          <img
                            src={DEFAULT_IMG_URL + single.imgLocation}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div key={1}>
                    <LightgalleryItem
                      group="any"
                      src={process.env.PUBLIC_URL + "/img/products/3.jpg"}
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
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
            </LightgalleryProvider>
          </div>
        </div>
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2"
          }`}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            <Swiper {...thumbnailSwiperParams}>
              {product.productImages && product.productImages.length ? (
                product.productImages.map((single, key) => {
                  return (
                    <div key={key}>
                      <div className="single-image">
                        <img
                          src={DEFAULT_IMG_URL + single.imgLocation}
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
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.object,
  thumbPosition: PropTypes.string,
};

export default ProductImageGalleryLeftThumb;
