import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../components/product/ProductGridListSingle";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  wishlistItems,
  sliderClassName,
  spaceBottomClass,
}) => {
  const cartId = 1;

  return (
    <Fragment>
      {products.map((product) => {
        return (
          <ProductGridListSingle
            key={product.id}
            cartId={cartId}
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cartItem={
              cartItems.filter((cartItem) => cartItem.productId === product.id)[0]
            }
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
