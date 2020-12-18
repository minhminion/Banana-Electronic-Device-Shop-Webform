import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import { useSelector } from "react-redux";

const MainPage = () => {
  const sessionLoading = useSelector((state) => state.sessions.sessionLoading);

  return (
    <Fragment>
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default MainPage;
