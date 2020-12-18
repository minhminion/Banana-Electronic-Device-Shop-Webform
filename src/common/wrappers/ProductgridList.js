import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect, useSelector } from "react-redux";
import wishListHandler from "../modules/Shop/WishList/handlers";
import cartHandler from "../modules/Shop/Cart/handlers";
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
  const cartId = useSelector((state) =>
    state.user.user && state.user.user.customer
      ? state.user.user.customer.cart.id
      : null
  );

  return (
    <Fragment>
      {products.slice(0, 9).map((product) => {
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
              cartItems.filter((cartItem) => cartItem.id === product.id)[0]
            }
            wishlistItem={
              wishlistItems.filter((wishlistItem) => wishlistItem.productTierId === product.productTiers[0].id)[0]
            }
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cart,
    wishlistItems: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (item, quantityCount, cartId, tierId) => {
      cartHandler(dispatch, props).addToCart(
        item,
        quantityCount,
        cartId,
        tierId
      );
    },
    addToWishlist: (item) => {
      wishListHandler(dispatch, props).addToWishList(item);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
