import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import Breadcrumb from "../../../../wrappers/Breadcrumb";
// import { animateScroll } from "react-scroll";
import { useSelector } from "react-redux";
import { MODULE_NAME } from "./constants/models";
import { useLocation } from "react-router-dom";
import { getQuery } from "../../common/helper";
import ShopTopbar from "../../common/wrappers/ShopTopbar";

const ProductList = ({
  strings,
  getAllProducts,
  getCategories,
}) => {
  const location = useLocation()

  const [layout, setLayout] = useState("grid three-column");
  const [filter, setFilter] = useState({
    page: 1,
    ...getQuery(location.search),
  });

  const { data, currentPage, totalPages, totalItems } = useSelector(
    (state) => state[MODULE_NAME].data
  );

  const { pathname } = location;

  

  const getLayout = (layout) => {
    setLayout(layout);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Cửa hàng</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cửa hàng
      </BreadcrumbsItem>

        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                {/* <ShopSidebar
                  categories={categories}
                  sideSpaceClass="mr-30"
                  getSearchByName={getSearchByName}
                  getSortParams={getSortParams}
                  getFilterTierPrice={getFilterTierPrice}
                /> */}
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  productCount={totalPages}
                  // getFilterSortParams={getFilterSortParams}
                  // sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                {/* <ShopProducts layout={layout} products={products} /> */}

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  {/* <Paginator
                    offset={pagination.offset}
                    totalRecords={pagination.total}
                    pageLimit={params.pageSize}
                    setOffset={(value) =>
                      setPagination((prev) => ({
                        ...prev,
                        offset: value,
                      }))
                    }
                    pageNeighbours={2}
                    currentPage={pagination.current}
                    setCurrentPage={handlePagination}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};


export default ProductList;
