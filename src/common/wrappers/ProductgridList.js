import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../components/product/ProductGridListSingle";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  sliderClassName,
  spaceBottomClass,
  isCombos,
}) => {
  const getCartItem = (product) => {
    if (isCombos) {
      return cartItems.filter((cartItem) => cartItem.comboId === product.id)[0];
    } else {
      return cartItems.filter(
        (cartItem) => cartItem.productId === product.id
      )[0];
    }
  };

  return (
    <Fragment>
      {products.map((product) => {
        return (
          <ProductGridListSingle
            key={product.id}
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cartItem={getCartItem(product)}
            isCombos={isCombos}
            // wishlistItem={
            //   wishlistItems.filter((wishlistItem) => wishlistItem.productTierId === product.productTiers[0].id)[0]
            // }
          />
        );
      })}
    </Fragment>
  );
};

export default ProductGrid;
