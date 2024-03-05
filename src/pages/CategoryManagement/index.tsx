import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import MainLayout from "../../layouts/MainLayout";

//axios
import axios from "axios";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import Spinner from "../../components/Spinner";
import { apiURL } from "../../config/constanst";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ActionMenu from "../../components/ActionMenu";
import { toast } from "react-toastify";
import PropertiesDialog from "./PropertiesDialog";

interface ICategoryManagementProps {
  id: string;
  name: string;
  startPrice: number;
  imagePath: string;
  username: string;
}

const CategoryMangement = () => {
  const [deleteDisable, setDeleteDisable] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const [categories, setCategories] = React.useState<IProductCategory[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState<string | number>("");

  const listCategory = [
    {
      id: 1,
      name: "Watches",
      properties: [
        {
          name: "Brand",
          type: "text",
        },
        {
          name: "Water Resistance",
          type: "boolean",
        },
        {
          name: "Price",
          type: "number",
        },
      ],
    },
    {
      id: 2,
      name: "Shoes",
      properties: [
        {
          name: "Brand",
          type: "text",
          options: ["Nike", "Adidas", "Puma"],
        },
        {
          name: "Size",
          type: "text",
        },
        {
          name: "Color",
          type: "text",
        },
      ],
    },
    {
      id: 3,
      name: "Clothes",
      properties: [
        {
          name: "Brand",
          type: "text",
        },
        {
          name: "Size",
          type: "text",
        },
        {
          name: "Material",
          type: "text",
        },
      ],
    },
  ];

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/categories`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response?.data.success) {
        setCategories(response?.data?.data);
      }
    } catch (error) {
      console.log("GET PRODUCT CATEGORY ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCategory = async () => {
    try {
      const response = await axios.get(`${apiURL}/categories`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      response && setCategories(response?.data?.data);
    } catch (error) {
      console.log("REFRESH CATEGORY ERORR", error);
    } finally {
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên danh mục", width: 460 },
    {
      field: "dataType",
      headerName: "Các trường",
      renderCell: (params: GridRenderCellParams<string>) => {
        return (
          <div className="w-[100px]">
            {/* <img src={params.value?.split("?")[0]} width={80} height={60} /> */}
            <ViewHistoryCell properties={params.row?.properties} />
          </div>
        );
      },
      width: 200,
    },
    {
      field: "actions",
      headerName: "Hành động",
      type: "string",
      width: 300,
      headerAlign: "left",
      align: "left",
      renderCell: (params: GridRenderCellParams<any>) => {
        const removeCategory = async (id: string | number) => {
          try {
            setActionLoading(true);
            setSelectedRow(id);
            //THIS NEED TO FIX
            const response = await axios.delete(`${apiURL}/products/${id}/`, {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            });

            if (response?.data?.success) {
              setActionLoading(false);

              refreshCategory();
              toast.success("Xóa sản phẩm thành công");
            } else {
              console.log("Error", response?.data?.data, response?.data?.error);
            }
          } catch (error) {
            setActionLoading(false);
            console.log("Client Error", error);
          }
        };
        const options = [
          {
            id: "delete",
            title: "Xóa danh mục",
            onPress: () => removeCategory(params.row?.id),
            onActionSuccess: () => refreshCategory(),
          },
        ];
        return actionLoading && selectedRow == params.row?.id ? (
          <Spinner size={20} />
        ) : (
          <ActionMenu options={options} />
        );
      },
    },
  ];

  React.useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <MainLayout
        title="Danh sách sản phẩm "
        children={
          isLoading ? (
            <div className="w-full h-full px-8 mt-20">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              <div className="flex flex-row justify-between items-center">
                <div></div>
                <div className="flex flex-row gap-x-2"></div>
              </div>
              <div className="h-[700px] w-full">
                <DataGrid
                  rows={categories}
                  columns={columns}
                  pageSize={11}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10]}
                  onSelectionModelChange={(newSelectionModel) => {
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
    </>
  );
};

export default CategoryMangement;

interface IViewCustomFieldCellProps {
  properties: {
    name: string;
    type: string;
    options?: string[];
  }[];
}

const ViewHistoryCell: React.FC<IViewCustomFieldCellProps> = (props) => {
  const [openBidHistory, setOpenBidHistory] = React.useState<boolean>(false);
  return (
    <div className="flex justify-center">
      <button
        className="w-[120px] justify-start"
        onClick={() => setOpenBidHistory(true)}
      >
        <p className="text-left mr-10">Xem</p>
      </button>
      {openBidHistory ? (
        <PropertiesDialog
          open={openBidHistory}
          onClose={() => setOpenBidHistory(false)}
          properties={props.properties}
        />
      ) : null}
    </div>
  );
};
