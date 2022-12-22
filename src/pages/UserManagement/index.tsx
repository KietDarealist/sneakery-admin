import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import MainLayout from "../../layouts/MainLayout";
import { Button, TablePagination } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 15, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const UserManagement = () => {
  const [deleteDisable, setDeleteDisable] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  return (
    <MainLayout
      title="Quản lý người dùng"
      children={
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
              rows={rows}
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
      }
    />
  );
};

export default UserManagement;
