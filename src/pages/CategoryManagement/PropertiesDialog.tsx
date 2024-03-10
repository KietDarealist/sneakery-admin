

import React, { useEffect, useState } from "react";

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { apiURL } from "../../config/constanst";
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
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";

interface IPropertiesDialogProps {
  onClose: () => void;
  open: boolean;
  categoryId: string | number;
  properties: IProductCategoryProperty[];
  onOpenCustomFields: (item: IProductCategoryProperty) => void;
  onUpdateFields: (params: IProductCategoryProperty[]) => void;
}

const PropertiesDialog: React.FC<IPropertiesDialogProps> = ({
  onClose,
  open,
  properties,
  onOpenCustomFields,
  onUpdateFields,
}) => {

  const [propertyValues, setPropertyValues] = useState<
    {
      name: string;
      type: string;
      options?: string[];
    }[]
  >(properties);

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


  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        className="rounded-lg"
        maxWidth="lg"
        fullWidth={true}
      >
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
                  Quản lý các trường của danh mục
                </h1>
                <Tooltip onClick={onClose} title="Đóng">
                  <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
                </Tooltip>
              </div>
              <div className="flex flex-col gap-y-5">
                {!!properties && properties?.length > 0 ? (
                  <>
                    <div
                      className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-lg justify-between"
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

                      <button
                   
                        className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-lg justify-center"
                      >
                        <IconButton      onClick={() => handleAddProperty()}>
                    <PlusCircleIcon className="text-gray-600 font-bold w-6 h-6"   />
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
                            onUpdateFields(propertyValues)
               
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center">
                    <InformationCircleIcon width={20} height={20} />
                    <p className="ml-2"></p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertiesDialog;
