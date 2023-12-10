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
import { apiURL } from "../../config/constanst";

interface IProductHomePageResponse {
  id: string;
  name: string;
  startPrice: number;
  imagePath: string;
  username: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên sản phẩm", width: 460 },
  {
    field: "startPrice",
    headerAlign: "left",
    align: "left",
    headerName: "Giá khởi điểm   ",
    type: "number",
    width: 150,
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <div className="w-[120px]">
          <p>X{params.value?.toString()?.prettyMoney()}</p>
        </div>
      );
    },
  },

  {
    field: "imagePath",
    headerName: "Hình ảnh",
    type: "string",
    width: 200,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <div className="w-[120px]">
          <img src={params.value?.split("?")[0]} width={80} height={60} />
        </div>
      );
    },
  },
  {
    field: "userName",
    headerName: "Bán bởi người dùng",
    // renderCell: (params: GridRenderCellParams<string>) => {
    //   console.log("PARAM", params);
    //   return (
    //     <div className="w-[120px]">
    //       <img src={params.value?.split("?")[0]} width={80} height={60} />
    //     </div>
    //   );
    // },
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
      const response = await axios.get(`${apiURL}/products/homepage`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
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

export default ProductManagement;
