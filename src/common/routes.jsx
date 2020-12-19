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

const Routes = () => {
  // const USER_ROLE = ENUMS.USER_ROLE;
  const { isSigned, roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/shop" component={ProductListPage} />
        <AuthRoute
          exact
          path="/login-register"
          component={LoginRegisterPage}
          condition={!isSigned}
          to="/"
          />
        {/* 404 Not Found */}
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </MainLayout>
  );
};

export default Routes;
