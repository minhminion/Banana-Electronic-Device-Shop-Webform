import PropTypes from "prop-types";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../common/wrappers/Breadcrumb";
import ProductImageDescription from "../../common/wrappers/ProductImageDescription";
import { useHistory, useLocation, useParams } from "react-router";
import { Typography } from "antd";
import handler from "./constants/handler";
import cartHandler from "../Carts/constants/handlers";
import { useDispatch, useSelector } from "react-redux";
import { MODULE_NAME as MODULE_CART } from "../Carts/constants/models";

const ProductDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { id } = useParams();

  const { fetchSingleProduct } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { addToCart } = useMemo(() => cartHandler(dispatch, props), [dispatch, props])

  const cartItems = useSelector((state) => state[MODULE_CART]);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const getSingleProduct = async (productId) => {
      const response = await fetchSingleProduct(productId);
      if (response) {
        setProduct(response);
      } else {
        history.push("/404");
      }
    };

    getSingleProduct(id);
    return () => {
      setProduct({});
    };
  }, [id]);

  if (!product) {
    return null
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Product Page</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Sản phẩm
      </BreadcrumbsItem>
      {/* breadcrumb */}
      <Breadcrumb />
      {product && product.id ? (
        <>
          <ProductImageDescription
              galleryType="leftThumb"
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
              cartItems={cartItems}
              addToCart={addToCart}
            />
        </>
      ) : (
        ""
      )}
      {/* product description with image */}
    </Fragment>
  );
};

ProductDetails.propTypes = {
  location: PropTypes.object,
  strings: PropTypes.object,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  wishlistItems: PropTypes.array,
};

export default ProductDetails;
