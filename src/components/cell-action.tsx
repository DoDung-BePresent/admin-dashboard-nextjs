"use client";

import axios from "axios";
import { Button, message } from "antd";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const CellAction = ({ id }: { id: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api` + pathname + `/${id}`);
      router.refresh();
      message.success("Delete successfully!");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="solid"
        color="default"
        onClick={() => router.push(pathname + `/${id}`)}
        disabled={loading}
      >
        Update
      </Button>
      <Button
        color="danger"
        variant="solid"
        onClick={handleDelete}
        disabled={loading}
      >
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
