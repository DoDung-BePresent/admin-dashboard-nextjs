"use client";

import { Table, TableProps } from "antd";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    createdAt: "2024-12-04T16:07:01.818+00:00",
  },
  {
    key: "2",
    name: "John",
    createdAt: "2024-12-04T16:07:01.818+00:00",
  },
];

const columns: TableProps["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
    render: (date) => new Date(date).toLocaleDateString(),
  },
];

const CategoriesPage = () => {
  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">List</h3>
      <div className="my-3">
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default CategoriesPage;
