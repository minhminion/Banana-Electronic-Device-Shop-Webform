import React from "react";
import { Form, Input, Button } from "antd";

const ShopSearch = ({ getSearchByName }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Tìm kiếm </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <Input.Search placeholder='Tìm kiếm tên sản phẩm...' onSearch={getSearchByName}/>
      </div>
    </div>
  );
};

export default ShopSearch;
