import React, { Fragment, useState, useEffect, useMemo } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import Breadcrumb from "../../common/wrappers/Breadcrumb";
// import { animateScroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { MODULE_NAME } from "./constants/models";
import { useHistory, useLocation } from "react-router-dom";
import { getQuery, objectToQueryString } from "../../common/helpers";
import ShopTopbar from "../../common/wrappers/ShopTopbar";
import ShopSidebar from "../../common/wrappers/ShopSidebar";
import ShopProducts from "../../common/wrappers/ShopProducts";
import handler from "./constants/handler";

const ProductList = (props) => {
  const location = useLocation();
  const history = useHistory();

  const [layout, setLayout] = useState("grid three-column");
  const [filter, setFilter] = useState({
    page: 1,
    ...getQuery(location.search),
  });

  const dispatch = useDispatch();
  const { getProductCategories, fetchProduct } = useMemo(
    () => handler(dispatch, props),
    [props, dispatch]
  );

  const {
    data: { data: productsData, currentPage, totalPages, totalItems },
    categories: { data: categoriesData },
  } = useSelector((state) => state[MODULE_NAME]);

  useEffect(() => {
    getProductCategories();
  }, []);

  useEffect(() => {
    if (location.search) {
      setFilter((prev) => ({
        ...getQuery(location.search),
      }));
    }
  }, [location]);

  useEffect(() => {
    if (filter) {
      fetchProduct({
        ...filter,
        limit: 8,
      });
    }
  }, [filter]);

  const { pathname } = location;

  const getSortParams = (sortValue) => {
    handleFilter({
      target: {
        name: "categoryId",
        value: sortValue[0] || 0,
      },
    });
  };

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const handleFilter = (e, condition = "=") => {
    const { name, value } = e.target;
    console.log('======== Bao Minh ~ file: ProductList.jsx ~ line 75 ~ handleFilter ~ value ', value )
    let newFilter = filter;
    let extendFilter = {};
    if (value === 0) {
      delete newFilter[`filters[${name}]`];
      delete newFilter[`filterConditions[${name}]`];
    } else {
      extendFilter = {
        [`filters[${name}]`]: value,
        [`filterConditions[${name}]`]: "=",
      };
    }
    history.push({
      pathname: location.pathname,
      search: `?${objectToQueryString({
        ...newFilter,
        page: 1,
        ...extendFilter,
      })}`,
    });
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
              <ShopSidebar
                categories={categoriesData}
                sideSpaceClass="mr-30"
                // getSearchByName={getSearchByName}
                getSortParams={getSortParams}
                // getFilterTierPrice={getFilterTierPrice}
              />
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
              <ShopProducts layout={layout} products={productsData || []} />

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
