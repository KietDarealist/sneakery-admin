import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
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
import { PlusIcon } from "@heroicons/react/20/solid";

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
            categoryId={params.row?.id}
              properties={params.row.properties}
              onUpdateItem={(returnedProperties) => {
                updateCurrentCategory({
                  id: params.row?.id,
                  name: params.row.name,
                  properties: returnedProperties,
                });

                refreshCategory()
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
            const response = await axios.delete(`${apiURL}/categories/${id}/`, {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            });

            if (response?.data?.success) {
              setActionLoading(false);

              refreshCategory();
              toast.success("Xóa danh mục thành công");
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
        title="Danh sách các danh mục"
        children={
          isLoading ? (
            <div className="w-full h-full px-8 mt-20">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              <div className="flex-end flex items-center w-full">
         
                <button className="bg-blue-500 text-white rounded-sm w-fit h-[40px] px-2 py-1 font-bold flex items-center ">       
                <PlusIcon className="w-[20px] h-[20px] text-white font-bold" /> 
                <p>Thêm danh mục</p></button>
              </div>
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
  categoryId: string | number
  properties: IProductCategoryProperty[];
  onUpdateItem: (item: IProductCategoryProperty[]) => void;
}

const ViewHistoryCell: React.FC<IViewCustomFieldCellProps> = (props) => {
  const [openPropertyDialog, setOpenPropertyDialog] = React.useState<boolean>(false);
  const [openCustomField, setOpenCustomField] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] =
    React.useState<IProductCategoryProperty | null>(null);
    const { user } = useAppSelector((state: IRootState) => state.auth);

  const { properties, onUpdateItem } = props;

  const handleOpenCustomField = (item: any) => {
    setOpenCustomField(true);
    setCurrentItem(item);
  };



  return (
    <div className="flex justify-center">
      <button
        className="w-[120px] justify-start"
        onClick={() => setOpenPropertyDialog(true)}
      >
        <p className="text-left mr-10">Xem</p>
      </button>
      {openPropertyDialog ? (
        <PropertiesDialog
        categoryId={props.categoryId}
          open={openPropertyDialog}
          onClose={() => setOpenPropertyDialog(false)}
          properties={properties}
          onOpenCustomFields={handleOpenCustomField}
          onUpdateFields={(fields) => {
            props.onUpdateItem(fields);
  
          }}
        />
      ) : null}

      <CustomFieldDialog
        open={openCustomField}
        onClose={() => setOpenCustomField(false)}
        onUpdateOptions={(value) => {
          let cloned = properties;
          properties?.forEach((property, propertyIndex) => {
            if (property?.name == currentItem?.name) {
              cloned[propertyIndex].options = value;
            }
          });
          setOpenCustomField(false);

        }}
        options={currentItem?.options}
      />
    </div>
  );
};
