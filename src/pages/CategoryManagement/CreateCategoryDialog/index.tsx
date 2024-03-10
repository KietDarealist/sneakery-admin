import React, { useEffect, useState } from "react";

//styles
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import {
  InformationCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "../../../designs/Button";
import SelectComponent from "../../../components/Select";

interface ICreateCategoryDialiog {
  onClose: () => void;
  open: boolean;
}

const CreateCategoryDialog: React.FC<ICreateCategoryDialiog> = ({
  onClose,
  open,
}) => {
  const [name, setName] = useState<string>("");
  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="sm"
      key={`property-dialog`}
      fullWidth={true}
    >
      <DialogContent className="max-h-[500px]">
        <div className="w-full gap-y-5 px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Quản lý các trường của danh mục
            </h1>
            <Tooltip onClick={onClose} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>

          <div className="flex flex-col gap-y-5 mt-4">
            <div>
              <p className="font-semibold text-gray-500 mb-2">Tên danh mục</p>
              <input
                placeholder="Nhập tên danh mục"
                title="Tên danh mục"
                value={name}
                className="w-full rounded-lg px-4 py-1 h-[40px] text-gray-500 bg-gray-100 focus:border-blue-500 focus-within:border-blue-500 border-1"
              />
            </div>

            <div>
              <p className="font-semibold text-gray-500 mb-2">Các Trường</p>
              <SelectComponent
                name="type"
                options={[
                  { id: "text", name: "Kiểu chuỗi" },
                  { id: "number", name: "Kiểu số" },
                  { id: "boolean", name: "Kiểu đúng sai" },
                ]}
                label="Kiểu dữ liệu"
                placeholder="Chọn kiểu dữ liệu cho trường"
                optionSelected={null}
                onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
