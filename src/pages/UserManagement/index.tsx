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

interface IUser {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  address?: IAddress;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Tên người dùng", width: 200 },
  {
    field: "email",
    headerName: "Emai",
    width: 300,
  },
  {
    field: "isActive",
    headerName: "Tình trạng",
    type: "string",
    width: 150,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridRenderCellParams<boolean>) =>
      params.value === true ? (
        <p className="px-2 py-1 text-green-800 bg-green-50 rounded-full text-xs font-bold">
          Đã xác thực
        </p>
      ) : (
        <p className="px-2 py-1 text-yellow-800 bg-yellow-50 rounded-full text-xs font-bold">
          Chưa xác thực
        </p>
      ),
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    type: "string",
    width: 300,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridRenderCellParams<IAddress>) =>
      params.value === null ? (
        <p>Chưa có địa chỉ</p>
      ) : (
        <p>
          {params.value?.homeNumber}, {params.value?.ward?.name},{" "}
          {params.value?.district?.name}
        </p>
      ),
  },
];

export interface IAddress {
  addressId: number;
  homeNumber: string;
  city: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  ward: {
    id: number;
    name: string;
  };
}

const UserManagement = () => {
  const [deleteDisable, setDeleteDisable] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getAllUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response) {
        console.log("response");
      }
    } catch (error) {
      console.log("GET USER ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllUser();
  }, []);

  return (
    <MainLayout
      title="Quản lý người dùng"
      children={
        loading ? (
          <div className="w-full h-full flex items-center justify-center mt-96">
            <Spinner />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex flex-row justify-between items-center">
              <div></div>
              <div className="flex flex-row gap-x-2">
                <Button variant="contained" disabled={!deleteDisable}>
                  Xóa người dùng
                </Button>
                <Button variant="outlined" disabled={deleteDisable}>
                  Xuất file CSV
                </Button>
              </div>
            </div>
            <div className="h-[700px] w-full">
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={11}
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

export default UserManagement;
