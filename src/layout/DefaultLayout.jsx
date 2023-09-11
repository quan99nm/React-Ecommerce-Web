import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const DefaultLayout = (props) => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default DefaultLayout;
