import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import MainLayout from "../../layouts/MainLayout";
import { Button, Skeleton, TablePagination } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import Spinner from "../../components/Spinner";

interface IProductHomePageResponse {
  id: string;
  name: string;
  startPrice: number;
  currentPrice: number;
  imagePath: string;
  username: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên sản phẩm", width: 300 },
  {
    field: "startPrice",
    headerAlign: "left",
    align: "left",
    headerName: "Giá khởi điểm",
    type: "number",
    width: 150,
  },
  {
    field: "imagePath",
    headerName: "Hình ảnh",
    type: "string",
    width: 200,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridRenderCellParams<string>) => (
      <div className="w-[120px]">
        <img src={params.value} width={80} height={60} />
      </div>
    ),
  },
  {
    field: "username",
    headerName: "Bán bởi người dùng",

    width: 200,
  },
];

const ProductManagement = () => {
  const [deleteDisable, setDeleteDisable] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const [products, setProducts] = React.useState<IProductHomePageResponse[]>(
    []
  );
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://sneakery.herokuapp.com/api/products/homepage`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      response && setProducts(response?.data?.data.products);
      response && console.log(response);
    } catch (error) {
      console.log("GET PRODUCT RESPONSE", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <MainLayout
      title="Danh sách sản phẩm "
      children={
        isLoading ? (
          <div className="w-full h-full flex items-center justify-center mt-96">
            <Spinner />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex flex-row justify-between items-center">
              <div></div>
              <div className="flex flex-row gap-x-2">
                <Button variant="contained" disabled={!deleteDisable}>
                  Xóa sản phẩm
                </Button>
                <Button variant="outlined" disabled={deleteDisable}>
                  Xuất file CSV
                </Button>
              </div>
            </div>
            <div className="h-[700px] w-full">
              <DataGrid
                rows={products}
                columns={columns}
                pageSize={10}
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

export default ProductManagement;
