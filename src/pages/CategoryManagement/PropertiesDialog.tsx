import React, { useEffect, useState } from "react";

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";

import {
  HandThumbDownIcon,
  InformationCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import CustomFieldDialog from "./CustomFieldsDialog";
import Button from "../../designs/Button";
import { toast } from "react-toastify";
import { apiURL } from "../../config/constanst";
import LoadingSkeleton from "../../components/LoadingSkeleton";

interface IPropertiesDialogProps {
  onClose: () => void;
  open: boolean;
  categoryId: string | number;
  properties: IProductCategoryProperty[];
  name: string;
  onOpenCustomFields: (item: IProductCategoryProperty) => void;
  onUpdateFields: (
    params: IProductCategoryProperty[],
    name: string,
    actionSuccess: () => void
  ) => void;
}

const PropertiesDialog: React.FC<IPropertiesDialogProps> = ({
  onClose,
  open,
  categoryId,
  properties,
  onOpenCustomFields,
  onUpdateFields,
  name,
}) => {
  const [propertyValues, setPropertyValues] = useState<
    {
      name: string;
      type: string;
      options?: string[];
    }[]
  >([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    setPropertyValues(properties || []);
  }, [properties]);

  const nameInputRef = React.useRef(null);

  const handleRemoveProperty = (index: number) => {
    let updatedProperties = [...propertyValues];
    updatedProperties.splice(index, 1);
    setPropertyValues(updatedProperties);
  };

  const handleAddProperty = () => {
    let updatedProperties = [...propertyValues];
    updatedProperties.push({ name: "", type: "text", options: [] });
    setPropertyValues(updatedProperties);
  };

  const refreshProperties = async () => {
    try {
      setIsRefresh(true);
      const response = await axios.get(`${apiURL}/categories/${categoryId}/`);
      if (response) {
        setIsRefresh(false);
        setPropertyValues(response?.data?.data?.properties);
      }
    } catch (error) {
      setIsRefresh(false);
      console.log("Error", error);
    }
  };

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        className="rounded-lg"
        maxWidth="lg"
        fullWidth={true}
      >
        {isRefresh ? (
          <DialogContent className="max-h-[800px]">
            <LoadingSkeleton />
          </DialogContent>
        ) : (
          <DialogContent className="max-h-[800px]">
            {false ? (
              <div>
                <h1 className="text-gray-600 font-bold text-2xl mb-4">
                  Quản lý các trường của danh mục
                </h1>
                <div className="w-full h-[40px] bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-full h-[40px] bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                <div className="w-full h-[40px] bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                <div className="w-full h-[40px] bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                <div className="w-full h-[40px] bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                <div className="w-full h-[40px] bg-gray-200 rounded-lg animate-pulse mt-4"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                <div className="flex justify-between items-center">
                  <h1 className="text-gray-600 font-bold text-2xl mb-2">
                    Quản lý danh mục
                  </h1>
                  <Tooltip onClick={onClose} title="Đóng">
                    <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
                  </Tooltip>
                </div>

                <div>
                  <p className="font-semibold text-gray-500 mb-2">
                    Tên danh mục
                  </p>
                  <input
                    placeholder="Nhập tên danh mục"
                    title="Tên danh mục"
                    value={name}
                    className="w-full rounded-lg px-4 py-1 h-[40px] text-gray-500 bg-gray-100 focus:border-blue-500 focus-within:border-blue-500 border-1"
                  />
                </div>

                <div className="flex flex-col ">
                  <>
                    <div
                      className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border-b border-gray-300 shadow-lg justify-between"
                      key="header"
                    >
                      <div className="w-1/4">
                        <p>Tên trường</p>
                      </div>
                      <div className="w-1/4">
                        <p>Kiểu dữ liệu</p>
                      </div>
                      <div className="w-1/4">
                        <p>Các options của trường</p>
                      </div>
                      <div className="w-1/4">
                        <p>Hành động</p>
                      </div>
                    </div>
                    <>
                      {propertyValues?.length > 0 &&
                        propertyValues?.map((item: any, index: number) => (
                          <div>
                            <div className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-lg justify-between">
                              <div className="w-1/4">
                                <input
                                  ref={nameInputRef}
                                  value={propertyValues[index].name}
                                  className="pl-4 py-1 border border-gray-300 rounded-lg"
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setPropertyValues((prevValues) =>
                                      prevValues.map((prevValue, idx) =>
                                        idx === index
                                          ? { ...prevValue, name: newValue }
                                          : prevValue
                                      )
                                    );
                                  }}
                                />
                              </div>
                              <div className="w-1/4">
                                <p>{item.type}</p>
                              </div>
                              <div className="w-1/4 flex items-center">
                                <IconButton
                                  title="Xem hoặc chỉnh sửa"
                                  onClick={() => onOpenCustomFields(item)}
                                >
                                  <PencilIcon className="text-gray-600 font-bold w-4 h-4" />
                                </IconButton>
                              </div>

                              <div className="w-1/4 flex items-center">
                                <IconButton
                                  title="Xem hoặc chỉnh sửa"
                                  onClick={() => handleRemoveProperty(index)}
                                >
                                  <TrashIcon className="text-gray-600 font-bold w-4 h-4" />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        ))}

                      <button className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-lg justify-center">
                        <IconButton onClick={() => handleAddProperty()}>
                          <PlusCircleIcon className="text-gray-600 font-bold w-6 h-6" />
                        </IconButton>
                      </button>
                    </>

                    <div className="flex justify-between w-full mt-8">
                      <div></div>
                      <div className="flex gap-x-2">
                        <Button
                          variant="secondary"
                          title="Đóng"
                          onClick={() => onClose()}
                        />
                        <Button
                          title="Cập nhật"
                          onClick={() => {
                            onUpdateFields(
                              propertyValues,
                              name,
                              refreshProperties
                            );
                          }}
                        />
                      </div>
                    </div>
                  </>
                </div>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default PropertiesDialog;
