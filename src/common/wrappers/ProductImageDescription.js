import PropTypes from "prop-types";
import React from "react";
import ProductDescriptionInfo from "../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
  cartItems,
  addToCart,
  isCombo
}) => {

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5">
              <div className="single-image">
                <img
                  src={process.env.PUBLIC_URL + (product.image || "/img/products/3.jpg" )}
                  className="img-fluid"
                  alt=""
                />
              </div>
          </div>
          <div className="col-lg-7 col-md-7">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              isCombo={isCombo}
              cartItems={cartItems}
              addToCart={addToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

export default ProductImageDescription;
