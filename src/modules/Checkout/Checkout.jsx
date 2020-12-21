import React, { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Input, Form, Row, Typography, notification } from "antd";
import { MODULE_NAME as MODULE_CART } from "../Carts/constants/models";
import { formatNumberToVND } from "../../common/helpers";
import { MetaTags } from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useHistory, useLocation } from "react-router-dom";
import Breadcrumb from "../../common/wrappers/Breadcrumb";
import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";

const { Title } = Typography;

const openNotificationWithIcon = (type, title, subTitle) => {
  notification[type]({
    message: title,
    description: subTitle,
  });
};

const Checkout = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const [form] = Form.useForm();

  const { creatOrder } = useMemo(() => handler(dispatch, props), [
    props,
    dispatch,
  ]);

  const { combo, details: cartItems } = useSelector(
    (state) => state[MODULE_CART]
  );

  const { isLoading, isSuccess, errors } = useSelector(
    (state) => state[MODULE_NAME]
  );

  let cartTotalPrice = combo.reduce(
    (value, item) => value + item.comboPrice * item.quantity,
    0
  );

  const handleCreateOrder = () => {
    form
      .validateFields()
      .then(async (values) => {
        const order = {
          ...values,
          orderDetails: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            comboId: item.comboId || null,
          })),
        };

        const result = await  creatOrder(order);

        if (result) {
          openNotificationWithIcon(
            "success",
            "Tạo hóa đơn thành công",
            "mời bạn tiếp tục mua hàng ."
          );
          history.push("/shop");
        } else {
          openNotificationWithIcon(
            "error",
            "Lỗi trong quá trình mua hàng",
            Object.values(errors).reduce((value, error) => value + error + "\n")
          );
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Thanh toán</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh toán
      </BreadcrumbsItem>

      {/* breadcrumb */}
      <Breadcrumb />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: 0,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.3)",
            zIndex: 99999,
          }}
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="shop-area pt-30 pb-100">
        <div className="container">
          <Row gutter={16}>
            <Col span={12}>
              <div className="checkout-payment">
                <Title level={3} style={{ marginBottom: 20 }}>
                  Thông tin vận chuyển
                </Title>
                <Form form={form} layout="vertical" requiredMark="optional">
                  <Form.Item
                    required
                    label="Địa chỉ"
                    name="deliveryAddress"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ nhận hàng",
                      },
                    ]}
                  >
                    <Input placeholder="Vui lòng nhập địa chỉ ..." />
                  </Form.Item>
                  <Form.Item label="Yêu cầu của khách hàng" name="description">
                    <Input.TextArea rows={5} placeholder="Mô tả ..." />
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col span={12}>
              <div className="your-order-area">
                <div className="your-order-wrap gray-bg-4">
                  <div className="your-order-product-info">
                    <div className="your-order-top">
                      <ul>
                        <li>Sản phẩm</li>
                        <li>Tổng tiền</li>
                      </ul>
                    </div>
                    <div className="your-order-middle">
                      <ul>
                        {cartItems.map((cartItem, key) => {
                          if (!cartItem.comboId) {
                            console.log(
                              "======== Bao Minh ~ file: Checkout.jsx ~ line 115 ~ .then ~ creatOrder",
                              creatOrder
                            );
                            cartTotalPrice += cartItem.totalPrice;
                          }

                          return (
                            <li key={key}>
                              <span className="order-middle-left">
                                {cartItem.product.name} X {cartItem.quantity}
                                {cartItem.comboId && (
                                  <h6>{`Combo ${cartItem.comboId}`}</h6>
                                )}
                              </span>{" "}
                              <span className="order-price">
                                {formatNumberToVND(cartItem.totalPrice)}đ
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="your-order-bottom">
                      <ul>
                        <li className="your-order-shipping">Vận chuyển</li>
                        <li>Miễn phí</li>
                      </ul>
                    </div>
                    <div className="your-order-total">
                      <ul>
                        <li className="order-total">Tổng tiền</li>
                        <li>{`${formatNumberToVND(cartTotalPrice)}đ`}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="payment-method"></div>
                </div>
                <div className="place-order mt-25">
                  <button className="btn-hover" onClick={handleCreateOrder}>
                    Thanh toán
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
