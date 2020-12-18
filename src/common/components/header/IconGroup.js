import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { Typography } from "antd";
import { MODULE_NAME as MODULE_AUTHOR } from "../../../modules/Author/constants/models";
import { clearAll } from "../../redux/actions/uiActions";

const { Text } = Typography;

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  deleteFromCart,
  iconWhiteClass,
  user,
}) => {
  const dispatch = useDispatch()

  const { isSigned, roleName, info } = useSelector((state) => state[MODULE_AUTHOR]);

  const signOut = () => {
    dispatch(clearAll())
  }
  
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const handleCart = (isOpen) => {
    const cartContent = document.querySelector(".shopping-cart-content");
    cartContent.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style account-setting d-none d-lg-block">
        <button
          style={{ display: "flex", width: isSigned ? 180 : "auto" }}
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
          { isSigned && info ? (
            <Text style={{ marginLeft: 5, fontSize: 14 }}>
              {`Chào, ${info?.lastName} ${info?.firstName}`}
            </Text>
          ) : null}
        </button>
        <div className="account-dropdown">
          <ul>
            {!isSigned ? (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Đăng ký
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/user/profile"}>
                    Tài khoản
                  </Link>
                </li>
                <li>
                  <Link onClick={() => signOut()} to={process.env.PUBLIC_URL}>
                    Thoát
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleCart(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          isSigned={isSigned}
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
};


export default IconGroup;
