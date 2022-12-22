import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import DashBoard from "./pages/DashBoard";
import ProductManagement from "./pages/ProductManagement";
import ExpressClient from "./pages/ExpressClient";
import Login from "./pages/Auth/Login";
import RootApp from "./routes/RootApp";
import store from "./redux";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <RootApp />
      </div>
    </Provider>
  );
}
