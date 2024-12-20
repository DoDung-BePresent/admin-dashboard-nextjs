"use client";

import { Plus } from "lucide-react";
import { Button, Table, TableProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

interface CustomTable {
  title: string;
  columns: TableProps["columns"];
  dataSource: TableProps["dataSource"];
}

const CustomTable: React.FC<CustomTable> = ({ title, columns, dataSource }) => {
  const router = useRouter();
  const pathname = usePathname();
  const addLink = pathname + "/add";
  return (
    <>
      <h3 className="font-semibold">{title}</h3>
      <div className="">
        <div className="text-right mb-4">
          <Button
            variant="solid"
            color="default"
            onClick={() => router.push(addLink)}
          >
            <Plus size={16} /> Add new
          </Button>
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
};

export default CustomTable;
