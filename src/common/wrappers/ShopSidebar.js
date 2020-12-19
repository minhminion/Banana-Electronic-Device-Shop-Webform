import PropTypes from "prop-types";
import React from "react";
import ShopSearch from '../components/product/ShopSearch'
import ShopCategories from "../components/product/ShopCategories";
import ShopTierPrice from "../components/product/ShopTierPrice";

const ShopSidebar = ({ getSortParams, sideSpaceClass, categories, getSearchByName, getFilterTierPrice }) => {

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch getSearchByName={getSearchByName}/>

      {/* filter by categories */}
      <ShopCategories
        categories={categories}
        getSortParams={getSortParams}
      />

      {/* filter by price */}
      {/* <ShopTierPrice getFilterTierPrice={getFilterTierPrice}/> */}

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
