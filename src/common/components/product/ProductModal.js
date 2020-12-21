import React, { Fragment, useState } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Space } from "antd";
import { formatNumberToVND } from "../../helpers";
import { MODULE_NAME as MODULE_CART } from "../../../modules/Carts/constants/models";
import { useDispatch, useSelector } from "react-redux";
import handler from "../../../modules/Carts/constants/handlers";
import { useMemo } from "react";
import { Link } from "react-router-dom";

function ProductModal({ product, wishlistItem, isCombo, ...props }) {
  const dispatch = useDispatch();

  const [quantityCount, setQuantityCount] = useState(1);
  const { addToCart } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { details: cartItems } = useSelector((state) => state[MODULE_CART]);

  const handleAddToCart = (product, quantityCount, cartId, selectedTier) => {
    setQuantityCount(1);
    addToCart(product, quantityCount, isCombo && product.id);
    props.onHide();
  };
  const addToWishlist = props.addtowishlist;

  const productCartQty = getProductCartQuantity(cartItems, product);

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
                <div key={1}>
                  <div className="single-image">
                    <img
                      src={process.env.PUBLIC_URL + "/img/products/3.jpg"}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  <Space direction="vertical">
                    <span>Giá: {formatNumberToVND(product.price)}đ</span>
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
                  {isCombo ? (
                    <>
                      <h5>
                        <strong>Chi tiết combo: </strong>
                      </h5>
                      <ul>
                        {product.comboDetails.map((item) => (
                          <Link
                            to={
                              process.env.PUBLIC_URL +
                              "/product/" +
                              item.productId
                            }
                          >
                            <li>+ {item?.product.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </>
                  ) : (
                    product.description && <p>{product?.description}</p>
                  )}
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
                          isCombo ||
                            quantityCount <
                              Math.floor(product.quantity) - productCartQty
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
                    {isCombo ||
                    (product.quantity && Math.floor(product.quantity) > 0) ? (
                      <button
                        onClick={() => handleAddToCart(product, quantityCount)}
                        disabled={
                          !isCombo &&
                          Math.floor(product.quantity) <= productCartQty
                        }
                      >
                        {isCombo ||
                        Math.floor(product.quantity) > productCartQty
                          ? "Thêm vào giỏ"
                          : "Hết hàng"}
                      </button>
                    ) : (
                      <button disabled>Hết hàng</button>
                    )}
                  </div>
                  <div className="pro-details-wishlist">
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
      </Modal>
    </Fragment>
  );
}

export default ProductModal;
