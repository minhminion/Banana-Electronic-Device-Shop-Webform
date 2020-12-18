import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../wrappers/Header";
import Footer from "../wrappers/Footer";
// import "../../assets/style.css";

const MainLayout = (props) => {
  const { children, headerContainerClass, headerTop, headerPaddingClass } = props;

  return (
    <Fragment>
      <Header
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
      />
      {children}
      <Footer
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </Fragment>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
