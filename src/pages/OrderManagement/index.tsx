import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import MainLayout from "../../layouts/MainLayout";
import { Button, TablePagination } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import Spinner from "../../components/Spinner";
import { apiURL } from "../../config/constanst";
import LoadingSkeleton from "../../components/LoadingSkeleton";

interface IOrder {
  id: number;
  product: IProduct;
  priceWin: number;
}

interface IProduct {
  id: number;
  name: string;
  startPrice: number;
  imagePath: string;
  username: string;
  bidClosingDate: string;
}

const OrderManagement = () => {
  const [deleteDisable, setDeleteDisable] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Tên sản phẩm",
      type: "string",
      width: 800,
      headerAlign: "left",
      align: "left",
      renderCell: (params: GridRenderCellParams<IProduct>) => (
        <p>{params.value?.name}</p>
      ),
    },

    { field: "priceWin", headerName: "Giá cuối cùng", width: 120 },
  ];

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/admin/revenue/`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      response && setOrders(response?.data?.data.orders as IOrder[]);
      response && console.log("ORDER", response?.data);
    } catch (error) {
      console.log("GET ALL ORDER ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    user && getAllOrders();
  }, [user]);

  return (
    <MainLayout
      title="Quản lý đơn hàng"
      children={
        loading ? (
          <div className="w-full h-full px-8 mt-20">
            <LoadingSkeleton />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex flex-row justify-between items-center">
              <div></div>
              <div className="flex flex-row gap-x-2">
                <Button variant="contained" disabled={!deleteDisable}>
                  Xóa đơn hàng
                </Button>
                <Button variant="outlined" disabled={deleteDisable}>
                  Xuất file CSV
                </Button>
              </div>
            </div>
            <div className="h-[700px] w-full">
              <DataGrid
                rows={orders}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[10]}
                onSelectionModelChange={(newSelectionModel) => {
                  console.log("NEW SELECTION MODEL", newSelectionModel);
                  setDeleteDisable(!deleteDisable);
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                checkboxSelection
              />
            </div>
          </div>
        )
      }
    />
  );
};

export default OrderManagement;
