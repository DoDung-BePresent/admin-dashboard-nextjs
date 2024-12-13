"use client";

import { message, SelectProps } from "antd";
import CustomTable from "@/components/custom-table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/get-categories";
import { categoryColumn } from "@/components/category/column";

const CategoriesPage = () => {
  const { storeId } = useParams<{ storeId: string }>();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const fetchedCategories = await getCategories(storeId);

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  return (
    <div className="container mb-5 md:mb-0">
      <CustomTable
        loading={loading}
        title="List category"
        columns={categoryColumn}
        dataSource={categories}
      />
    </div>
  );
};

export default CategoriesPage;
