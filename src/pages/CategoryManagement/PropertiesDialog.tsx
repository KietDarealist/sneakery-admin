import React, { useEffect, useState } from "react";

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { apiURL } from "../../config/constanst";
import { InformationCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import CustomFieldDialog from "./CustomFieldsDialog";

interface IPropertiesDialogProps {
  onClose: () => void;
  open: boolean;
  properties: {
    name: string;
    type: string;
    options?: string[];
  }[];
}

const PropertiesDialog: React.FC<IPropertiesDialogProps> = ({
  onClose,
  open,
  properties,
}) => {
  const [openCustomField, setOpenCustomField] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any | null>(null);

  const handleOpenCustomField = (item: any) => {
    setOpenCustomField(true);
    setCurrentItems(item);
  };

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
                            <p>{item.name}</p>
                          </div>
                          <div className="w-1/3">
                            <p>{item.type}</p>
                          </div>
                          <div className="w-1/3 flex items-center">
                            <IconButton
                              title="Xem hoặc chỉnh sửa"
                              onClick={() => handleOpenCustomField(item)}
                            >
                              <PencilIcon className="text-gray-600 font-bold w-4 h-4" />
                            </IconButton>
                          </div>
                        </div>

                        {openCustomField ? (
                          <CustomFieldDialog
                            open={openCustomField}
                            onClose={() => setOpenCustomField(false)}
                            onUpdateOptions={() => {}}
                            options={currentItems?.options}
                          />
                        ) : null}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex items-center">
                    <InformationCircleIcon width={20} height={20} />
                    <p className="ml-2">Sản phẩm chưa được đấu giá</p>
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
