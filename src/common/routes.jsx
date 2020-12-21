import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import MainLayout from "./HOCS/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import LoginRegisterPage from "../pages/LoginRegisterPage";
import AuthRoute from "./components/routes/AuthRoute";
import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPages from "../pages/CartPages";
import ComboListPage from "../pages/ComboListPage";
import CheckoutPage from "../pages/CheckoutPage";
import ComboDetailsPage from "../pages/ComboDetailsPage";
import HomePage from "../pages/HomePage";

const Routes = () => {
  // const USER_ROLE = ENUMS.USER_ROLE;
  const { isSigned, roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/shop" component={ProductListPage} />
        <Route exact path="/combo" component={ComboListPage} />
        <Route exact path="/combo/:comboId" component={ComboDetailsPage} />
        <Route exact path="/cart" component={CartPages} />
        <AuthRoute
          exact
          path="/checkout"
          component={CheckoutPage}
          condition={isSigned}
          to="/login-register"
        />
        <Route exact path="/product/:id" component={ProductDetailsPage} />
        <AuthRoute
          exact
          path="/login-register"
          component={LoginRegisterPage}
          condition={!isSigned}
          to="/"
        />
        <Route exact path="/" component={HomePage} />
        {/* 404 Not Found */}
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </MainLayout>
  );
};

export default Routes;
