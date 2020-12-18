import React, { Fragment, useMemo } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Alert, Tabs } from "antd";
import "./common/style/TabsLoginAndRegister.css";
import Login from "./common/components/Login";
import Register from "./common/components/Register";
import Breadcrumb from "../../common/wrappers/Breadcrumb";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";

const { TabPane } = Tabs;

const LoginRegister = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { login, register } = useMemo(() => handler(dispatch, props), [props, dispatch]);

  const { isLoading: loading, error,  } = useSelector(
    (state) => state[MODULE_NAME]
  );

  return (
    <Fragment>
      <MetaTags>
        <title>{`Banana Boys | Login`}</title>
      </MetaTags>
      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem> */}
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="login-register-area pb-100">
          <div className="container">
            <div className="row">
              <div className="login-register-wrapper">
                <div className="login-register-left">
                  <h2>Đăng nhập</h2>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "300",
                      color: "rgb(120, 120, 120)",
                    }}
                  >
                    Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu
                    thích, nhận nhiều ưu đãi hấp dẫn.
                  </p>
                  <img
                    src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png"
                    alt=""
                  />
                </div>
                <div className="login-register-right">
                  
                  <Tabs defaultActiveKey="login">
                    <TabPane
                      tab={<span style={{ fontSize: "20px" }}>Đăng nhập</span>}
                      key="login"
                    >
                      <Login loginAccount={login} error={error} loading={loading}/>
                    </TabPane>
                    <TabPane
                      tab={<span style={{ fontSize: "20px" }}>Đăng ký</span>}
                      key="register"
                    >
                      <Register
                        registerAccount={register}
                      />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

LoginRegister.propTypes = {
};

export default LoginRegister;
