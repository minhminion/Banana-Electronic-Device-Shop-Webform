import React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-area bg-gray-3">
      <div className="container">
        <div className="breadcrumb-content">
          <Breadcrumbs
            separator={<span>/</span>}
            item={NavLink}
            finalItem={"span"}
          />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
