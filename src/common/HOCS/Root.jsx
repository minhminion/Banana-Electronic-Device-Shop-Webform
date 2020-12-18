import React from "react";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { Provider } from "react-redux";
import MainPage from "./MainPage";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BreadcrumbsProvider>
        <MainPage />
      </BreadcrumbsProvider>
    </Provider>
  );
};

export default Root;
