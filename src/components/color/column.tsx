"use client";

import { TableProps } from "antd";
import CellAction from "@/components/cell-action";

export const colorColumn: TableProps["columns"] = [
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
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => name.toLocaleUpperCase(),
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    render: (code: string) => code.toUpperCase(),
  },
  {
    title: "Color",
    key: "color",
    dataIndex: "code",
    render: (_, record) => (
      <div
        className="w-7 h-7 rounded-sm border"
        style={{ backgroundColor: `${record.code}` }}
      />
    ),
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
