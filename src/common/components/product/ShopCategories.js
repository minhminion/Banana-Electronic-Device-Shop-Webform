import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams }) => {
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  useEffect(() => {
    getSortParams(categoriesFilter)
  }, [categoriesFilter])

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Loại sản phẩm </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    setCategoriesFilter([]);
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Tất cả
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        // FIlter categories with Array 
                        // setCategoriesFilter((prev) => {
                        //   const index = prev.indexOf(category.id)
                        //   index > -1 && prev.splice(index, 1)
                        //   return index > -1 ? prev : [ ...prev, category.id ]
                        // }
                        // )
                        setCategoriesFilter([category.id])
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "Không tìm thấy loại sản phẩm"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
