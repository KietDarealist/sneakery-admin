import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../../../config/constanst";
import MainLayout from "../../../layouts/MainLayout";

interface ICategoryDetailProps {}

const CategoryDetail: React.FC<ICategoryDetailProps> = (props) => {
  const params = useParams();
  const categoryId = (params as any)?.id;
  const [categoryDetail, setCategoryDetail] = useState<IProductCategory | null>(
    null
  );
  const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false);

  useEffect(() => {
    getCategoryDetail();
  }, []);

  const getCategoryDetail = async () => {
    try {
      setIsLoadingCategory(true);
      const response = await axios.get(`${apiURL}/categories/${categoryId}`);
      if (response?.data?.success) {
        setIsLoadingCategory(false);
        setCategoryDetail(response?.data?.data);
      }
    } catch (error) {
      setIsLoadingCategory(false);
    }
  };

  return (
    <>
      {isLoadingCategory ? (
        <div></div>
      ) : (
        <MainLayout
          children={
            <div>
              <div className="flex flex-col gap-y-5">
                <div className="flex gap-x-10 w-full">
                  <div>
                    <p className="font-semibold text-gray-500 mb-2">
                      Tên danh mục
                    </p>
                    <input
                      defaultValue={categoryDetail?.name}
                      value={categoryDetail?.name}
                      title="Tên danh mục"
                      className="w-[300px] rounded-lg px-4 py-1 h-[40px] text-gray-500 bg-gray-100 focus:border-blue-500 focus-within:border-blue-500 border-1"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-500 mb-2">
                      Tên danh mục
                    </p>
                    <input
                      defaultValue={categoryDetail?.name}
                      value={categoryDetail?.name}
                      title="Tên danh mục"
                      className="w-[300px] rounded-lg px-4 py-1 h-[40px] text-gray-500 bg-gray-100 focus:border-blue-500 focus-within:border-blue-500 border-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          title={`Chi tiết danh mục ${categoryDetail?.name}`}
        />
      )}
    </>
  );
};

export default CategoryDetail;
