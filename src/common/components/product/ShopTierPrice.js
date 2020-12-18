import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { setActiveSort } from "../../helpers/product";
import { Form, InputNumber, Button, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/util";

const { Text } = Typography;

const ShopTierPrice = ({ getFilterTierPrice }) => {
  const [form] = useForm();

  const onFinish = (values) => {
    getFilterTierPrice(values);
  };

  const onReset = () => {
    form.resetFields()
    getFilterTierPrice({
      ProductTier1FromPrice: null,
      ProductTier1ToPrice: null,
      ProductTier2FromPrice: null,
      ProductTier2ToPrice: null,
    });
  };

  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Lọc theo giá</h4>
      <div className="sidebar-widget-list mt-30">
        <Form
          form={form}
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onReset={onReset}
          initialValues={{
            filterTierId: 0,
          }}
        >
          <Form.Item
            label={<Text strong>Sản phẩm loại 1 :</Text>}
            labelCol={{ span: 24 }}
          />
          <Form.Item label="Giá từ" name="ProductTier1FromPrice">
            <InputNumber
              formatter={(value) =>
                `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
              placeholder="Giá từ..."
            />
          </Form.Item>
          <Form.Item label="Đến" name="ProductTier1ToPrice">
            <InputNumber
              formatter={(value) =>
                `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
              placeholder="Giá kết thúc ..."
            />
          </Form.Item>
          <Form.Item
            label={<Text strong>Sản phẩm loại 2 :</Text>}
            labelCol={{ span: 24 }}
          />
          <Form.Item label="Giá từ" name="ProductTier2FromPrice">
            <InputNumber
              formatter={(value) =>
                `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
              placeholder="Giá từ..."
            />
          </Form.Item>
          <Form.Item label="Đến" name="ProductTier2ToPrice">
            <InputNumber
              formatter={(value) =>
                `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
              placeholder="Giá kết thúc ..."
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Lọc giá
              </Button>
              <Button type="link" htmlType="reset">
                Làm mới
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

ShopTierPrice.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopTierPrice;
