import PropTypes from "prop-types";
import React from "react";
import { createNavMobile } from "../NavItem";

const MobileNavMenu = () => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      {createNavMobile()}
    </nav>
  );
};

MobileNavMenu.propTypes = {

};

export default MobileNavMenu;
