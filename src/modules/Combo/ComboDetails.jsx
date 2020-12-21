import React, { Fragment, useEffect, useMemo, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../common/wrappers/Breadcrumb";
import handler from "./constants/handler";
import cartHandler from "../Carts/constants/handlers";
import { MODULE_NAME as MODULE_CART } from "../Carts/constants/models";
import ProductImageDescription from "../../common/wrappers/ProductImageDescription";

const ComboDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { comboId } = useParams();

  const { fetchSingleCombo } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { addToCart } = useMemo(() => cartHandler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { details: cartItems } = useSelector((state) => state[MODULE_CART]);

  const [combo, setCombo] = useState({});

  useEffect(() => {
    const getSingleProduct = async (productId) => {
      const response = await fetchSingleCombo(productId);
      if (response) {
        setCombo(response);
      } else {
        history.push("/404");
      }
    };

    getSingleProduct(comboId);
    return () => {
      setCombo({});
    };
  }, [comboId]);

  if (!combo) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Chi tiết Combo </title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Combo
      </BreadcrumbsItem>

      {/* breadcrumb */}
      <Breadcrumb />
      {combo && combo.id ? (
        <>
          <ProductImageDescription
            galleryType="leftThumb"
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={combo}
            isCombo={true}
            cartItems={cartItems}
            addToCart={addToCart}
          />
        </>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ComboDetails;
