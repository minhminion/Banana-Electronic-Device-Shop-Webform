import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Logo from "../components/header/Logo";
import NavMenu from "../components/header/NavMenu";
import IconGroup from "../components/header/IconGroup";
import HeaderTop from "../components/header/HeaderTop";
import MobileMenu from "../components/header/MobileMenu";

const Header = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ""}`}
    >
      <div
        className={`${headerPaddingClass ? headerPaddingClass : ""} ${
          top === "visible" ? "d-none d-lg-block" : "d-none"
        } header-top-area ${
          borderStyle === "fluid-border" ? "border-none" : ""
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={` ${
          headerPaddingClass ? headerPaddingClass : ""
        } sticky-bar header-res-padding clearfix ${
          scroll > headerTop + 50 ? "stick" : ""
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row" style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center'
          }}>
            <div className="col-xl-4 col-lg-4 col-md-6 col-8">
              {/* header logo */}
              <Logo imageUrl="/img/BananaLogo.png" logoClass="logo" style={{ width: 75 }}/>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block">
              {/* Nav menu */}
              <NavMenu />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

Header.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string
};

export default Header;
