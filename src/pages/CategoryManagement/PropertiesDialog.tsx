import React, { useEffect, useState } from "react";

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { apiURL } from "../../config/constanst";
import { InformationCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import CustomFieldDialog from "./CustomFieldsDialog";
import Button from "../../designs/Button";

interface IPropertiesDialogProps {
  onClose: () => void;
  open: boolean;
  properties: {
    name: string;
    type: string;
    options?: string[];
  }[];
  onOpenCustomFields: (item: any) => void;
}

const PropertiesDialog: React.FC<IPropertiesDialogProps> = ({
  onClose,
  open,
  properties,
  onOpenCustomFields,
}) => {
  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        className="rounded-lg"
        maxWidth="md"
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
                      className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-lg justify-between"
                      key="header"
                    >
                      <div className="w-1/3">
                        <p>Tên trường</p>
                      </div>
                      <div className="w-1/3">
                        <p>Kiểu dữ liệu</p>
                      </div>
                      <div className="w-1/3">
                        <p>Các lựa chọn</p>
                      </div>
                    </div>
                    {properties?.map((item, index) => (
                      <div key={`${item?.name}`}>
                        <div className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-lg justify-between">
                          <div className="w-1/3">
                            <input
                              className="pl-4 py-1 border border-gray-300 rounded-lg"
                              defaultValue={item?.name}
                              value={item?.name}
                              onChange={(text) => {
                                // let clonedValues = values;
                                // clonedValues[index] = text.target.value;
                                // setValues([...clonedValues]);
                              }}
                            />
                          </div>
                          <div className="w-1/3">
                            <p>{item.type}</p>
                          </div>
                          <div className="w-1/3 flex items-center">
                            <IconButton
                              title="Xem hoặc chỉnh sửa"
                              onClick={() => onOpenCustomFields(item)}
                            >
                              <PencilIcon className="text-gray-600 font-bold w-4 h-4" />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between w-full mt-8">
                      <div></div>
                      <div className="flex gap-x-2">
                        <Button
                          variant="secondary"
                          title="Đóng"
                          onClick={() => onClose()}
                        />
                        <Button title="Cập nhật" onClick={() => {}} />
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
