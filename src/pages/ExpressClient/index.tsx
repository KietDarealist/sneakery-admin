import { InputBase } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import InputNumber from "../../designs/InputNumber";
import MainLayout from "../../layouts/MainLayout";

interface IExpressClientProps {}

interface IFormValue {
  insurranceFee: string;
  serviceFee: string;
}

const ExpressClient: React.FC<IExpressClientProps> = (props) => {
  const [initialValues, setInitialValues] = useState<IFormValue>({
    insurranceFee: "",
    serviceFee: "",
  });

  const handleSubmit = (values: IFormValue) => {
    console.log("SUBMIT VALUE", values);
  };

  return (
    <MainLayout
      title="Đơn vị vận chuyển"
      children={
        <div>
          <h1 className="text-2xl text-gray-500 font-bold text-center">
            Cài đặt các chi phí với Client Giao Hàng Nhanh
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <div className="w-full flex gap-x-5 items-center mt-4">
              <InputNumber name="insurranceFee" label="Phí bảo hiểm" />
              <InputNumber name="serviceFee" label="Phí dịch vụ" />
            </div>
          </Formik>
        </div>
      }
    />
  );
};

export default ExpressClient;
