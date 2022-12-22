import React, { ReactComponentElement, ReactNode } from "react";
import DashBoard from "../../pages/DashBoard";
import {
  AdjustmentsHorizontalIcon,
  BuildingStorefrontIcon,
  ChartBarSquareIcon,
  GiftIcon,
  InboxStackIcon,
  TruckIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

interface IMainLayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout: React.FC<IMainLayoutProps> = (props) => {
  return (
    <div className="flex  space-x-30 w-full">
      <div className="flex flex-col space-y-8 px-4 py-4 w-1/5 pt-4 border-r border-r-gray-200 h-screen">
        <h1 className="text-blue-500 text-2xl font-bold cursor-pointer px-4 py-4 border-b border-b-gray-200">
          Sneakery Admin
        </h1>
        <Link to="/home">
          <div className="flex items-center space-x-3  py-4 px-4 hover:bg-gray-100 cursor-pointer">
            <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />
            <p className="text-gray-500 font-semibold text-lg">Tổng quan</p>
          </div>
        </Link>
        <Link to="/user-management">
          <div className="flex items-center space-x-3  py-4 px-4 hover:bg-gray-100 cursor-pointer">
            <UserCircleIcon className="h-6 w-6 text-gray-500" />
            <p className="text-gray-500 font-semibold text-lg">
              Quản lý người dùng
            </p>
          </div>
        </Link>
        <Link to="/products-management">
          <div className="flex items-center space-x-3  py-4 px-4 hover:bg-gray-100 cursor-pointer">
            <InboxStackIcon className="h-6 w-6 text-gray-500" />
            <p className="text-gray-500 font-semibold text-lg">
              Quản lý sản phẩm
            </p>
          </div>
        </Link>
        <Link to="/express-client">
          <div className="flex items-center space-x-3  py-4 px-4 hover:bg-gray-100 cursor-pointer">
            <GiftIcon className="h-6 w-6 text-gray-500" />
            <p className="text-gray-500 font-semibold text-lg">
              Quản lý đơn hàng
            </p>
          </div>
        </Link>
        <div className="flex items-center space-x-3  py-4 px-4 hover:bg-gray-100 cursor-pointer">
          <WalletIcon className="h-6 w-6 text-gray-500" />
          <p className="text-gray-500 font-semibold text-lg">
            Cách thức thanh toán
          </p>
        </div>

        <div className="flex items-center space-x-3  py-4 px-4 hover:bg-gray-100 cursor-pointer">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-500" />
          <p className="text-gray-500 font-semibold text-lg">Cài đặt</p>
        </div>
      </div>
      <div className="w-4/5">
        <Header title={props.title} />
        <div className="mt-10 px-5">{props.children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
