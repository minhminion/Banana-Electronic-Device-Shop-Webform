import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";


const HeaderTop = ({
  borderStyle
}) => {
  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      <div className="header-offer">
        <p>
          Free delivery
          <span>  
            200000
          </span>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTop);
