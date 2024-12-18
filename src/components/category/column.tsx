import { TableProps } from "antd";
import CellAction from "@/components/cell-action";

export const categoryColumn: TableProps["columns"] = [
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
