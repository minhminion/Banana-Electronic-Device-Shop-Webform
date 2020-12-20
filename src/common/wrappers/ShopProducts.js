import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout, carts, isCombos }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList products={products} spaceBottomClass="mb-25" cartItems={carts} isCombos={isCombos}/>
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;
