import PropTypes from "prop-types";
import React, { useState} from "react";
import { useSelector } from "react-redux";
import parser from "html-react-parser"
import {
  getProductCartQuantity,
} from "../../../common/helpers/product";
import { Space, Rate } from "antd";
import { formatNumberToVND } from "../../helpers";

const ProductDescriptionInfo = ({
  product,
  cartItems,
  addToCart,
}) => {

  const rating = Math.round((product.productTier1AverageRate+product.productTier2AverageRate)/2)

  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(cartItems, product);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        <Space direction="vertical">
          <span>{`${formatNumberToVND(product.price)}đ`}</span>
        </Space>
      </div>
      {rating  >= 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rate value={rating  }  disabled/>
          </div>
        </div>
      ) : (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rate value={4  }  disabled/>
          </div>
        </div>
      )}
      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>
      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
                quantityCount < Math.floor(product.quantity) - productCartQty
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
          {product.quantity && product.quantity > 0 ? (
            <button
              onClick={() =>
                addToCart(product, quantityCount)
              }
              disabled={productCartQty >= Math.floor(product.quantity)}
            >
              {productCartQty >= Math.floor(product.quantity)
                ? "Hết hàng"
                : "Thêm vào giỏ"}
            </button>
          ) : (
            <button disabled>Hết hàng</button>
          )}
        </div>
      </div>

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};



export default ProductDescriptionInfo;
