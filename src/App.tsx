import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import DashBoard from "./pages/DashBoard";
import ProductManagement from "./pages/ProductManagement";
import ExpressClient from "./pages/ExpressClient";
import Login from "./pages/Auth/Login";

export default function App() {
  return (
    <div>
      {/* Route components are rendered if the path prop matches the current URL */}
      <Route path="/auth/login">
        <Login />
      </Route>
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
    </div>
  );
}
