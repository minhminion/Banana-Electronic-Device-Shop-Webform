import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";

const Logo = ({ imageUrl, logoClass, style }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"} >
        <Space style={{ alignItems: 'baseline'}} >
          <img alt="" src={process.env.PUBLIC_URL + imageUrl} style={{...style}} />
          <Typography.Title level={3}>Banana Boys</Typography.Title>
        </Space>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
