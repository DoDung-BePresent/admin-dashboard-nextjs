"use client";

import { message, SelectProps } from "antd";
import CustomTable from "@/components/custom-table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBrands } from "@/actions/get-brands";
import { brandColumn } from "@/components/brand/column";

const CategoriesPage = () => {
  const { storeId } = useParams<{ storeId: string }>();

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const fetchedBrands = await getBrands(storeId);

        setBrands(fetchedBrands);
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
        title="List brand"
        columns={brandColumn}
        dataSource={brands}
      />
    </div>
  );
};

export default CategoriesPage;
