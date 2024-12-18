"use client";

import { message, SelectProps } from "antd";
import CustomTable from "@/components/custom-table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { colorColumn } from "@/components/color/column";
import { getColors } from "@/actions/get-colors";

const CategoriesPage = () => {
  const { storeId } = useParams<{ storeId: string }>();

  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const fetchedColors = await getColors(storeId);

        setColors(fetchedColors);
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
        title="List color"
        columns={colorColumn}
        dataSource={colors}
      />
    </div>
  );
};

export default CategoriesPage;
