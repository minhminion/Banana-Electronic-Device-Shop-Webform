import React, { Fragment } from "react";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Trang chủ</title>
      </MetaTags>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div>
          <h1>Xin chào bạn đến với cửa hàng</h1>
          <h2>
            <strong>Banana Boys Electronic Device</strong>
          </h2>
          <div className="item-empty-area__text">
            <Link to={process.env.PUBLIC_URL + "/shop"}>Mua ngay</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
