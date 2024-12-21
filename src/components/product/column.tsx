"use client";

import { TableProps } from "antd";
import CellAction from "@/components/cell-action";
import Image from "next/image";
import { formatter } from "@/lib/utils";

export const productColumn: TableProps["columns"] = [
  {
    key: "#",
    title: "#",
    dataIndex: "_id",
    render: (_text, _record, index) => {
      return index + 1;
    },
    width: 70,
  },
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
    render: (_text, record) => {
      const productImage = record.images?.[0]?.url;
      return (
        <div className="flex items-center gap-5">
          <Image
            src={productImage}
            alt={record.images?.[0]?.alt || "product-image"}
            width={70}
            height={70}
            style={{ borderRadius: "4px", objectFit: "cover" }}
            className="aspect-square"
          />
          <div className="">
            <p className="font-medium text-[16px]">{record.name}</p>
            <p className="text-gray-500">{record.brand.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: "Stock",
    dataIndex: "quantity",
    key: "quantity",
    width: 100,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 120,
    render: (currency) => formatter.format(currency),
  },
  {
    title: "Create Date",
    dataIndex: "createdAt",
    key: "date",
    width: 150,
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    width: 200,
    render: (_, record) => <CellAction id={record.id} />,
  },
];
