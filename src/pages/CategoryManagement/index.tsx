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
import CustomFieldDialog from "./CustomFieldsDialog";

const CategoryMangement = () => {
  const [deleteDisable, setDeleteDisable] = React.useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const [categories, setCategories] = React.useState<IProductCategory[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState<string | number>("");

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

  const updateCurrentCategory = async (item: IProductCategory) => {
    if (item.id !== null) {
      try {
        const response = await axios.put(
          `${apiURL}/categories/${item.id}`,
          item
        );
        if (response?.data?.success) {
          toast.success("Cập nhật danh mục thành công");
        } else {
          toast.success("Cập nhật danh mục thất bại");
          console.log("Update current category error");
        }
      } catch (error) {
        console.log("Errors is");
      }
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
            <ViewHistoryCell

            
              properties={params.row?.properties}
              onUpdateItem={(singleItem) => {
                let singleItemIndex = 0;
                params.row.properties?.forEach(
                  (property: any, propertyIndex: number) => {
                    if (property.name == singleItem?.name) {
                      console.log("HAPPENS");
                      singleItemIndex = propertyIndex;
                    }
                  }
                );
                let clonedProperty = params.row.properties;
                clonedProperty[singleItemIndex] = singleItem;
                updateCurrentCategory({
                  id: params.row?.id,
                  name: params.row.name,
                  properties: clonedProperty,
                });
              }}
            />
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

  onUpdateItem: (item: IProductCategory) => void;
}

const ViewHistoryCell: React.FC<IViewCustomFieldCellProps> = (props) => {
  const [openBidHistory, setOpenBidHistory] = React.useState<boolean>(false);
  const [openCustomField, setOpenCustomField] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<any | null>(null);

  const handleOpenCustomField = (item: any) => {
    setOpenCustomField(true);
    setCurrentItem(item);
  };

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
          onOpenCustomFields={handleOpenCustomField}
        />
      ) : null}

      <CustomFieldDialog
        key={JSON.stringify(currentItem?.options)}
        open={openCustomField}
        onClose={() => setOpenCustomField(false)}
        onUpdateOptions={(value) => {
          setCurrentItem({
            ...currentItem,
            options: value,
          });

          props.onUpdateItem({
            ...currentItem,
            options: value,
          });
          setOpenCustomField(false);
          // setOpenBidHistory(false);
        }}
        options={currentItem?.options}
      />
    </div>
  );
};
