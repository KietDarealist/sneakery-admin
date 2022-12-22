import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import UserManagement from "../pages/UserManagement";
import DashBoard from "../pages/DashBoard";
import ProductManagement from "../pages/ProductManagement";
import ExpressClient from "../pages/ExpressClient";
import Login from "../pages/Auth/Login";
import LoginPage from "../pages/Auth/Login";
import { useAppSelector } from "../hooks/useRedux";
import { IRootState } from "../redux";

export default function RootApp() {
  const { user } = useAppSelector((state: IRootState) => state.auth);
  return (
    <div>
      {/* Route components are rendered if the path prop matches the current URL */}
      <Route
        path="/"
        render={() => {
          return user !== null ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          );
        }}
      ></Route>
      <Route path="/home">
        <DashBoard />
      </Route>
      <Route path="/user-management">
        <UserManagement />
      </Route>
      <Route path="/products-management">
        <ProductManagement />
      </Route>
      <Route path="/express-client">
        <ExpressClient />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </div>
  );
}
