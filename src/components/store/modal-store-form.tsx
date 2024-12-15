"use client";

import { SetStateAction, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";
import { StoreRules } from "@/utils/form-rules";

interface ModalStoreFormProps {
  isOpen: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

const ModalStoreForm: React.FC<ModalStoreFormProps> = ({ isOpen, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: { name: string; email: string }) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);

      window.location.assign(`/stores/${response.data.id}`);
      message.success("Create new store successfully!");
    } catch (error) {
      console.log(error);
      setOpen(false);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Modal
      title="Create new store"
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        disabled={loading}
        layout="vertical"
        size="large"
        onFinish={onFinish}
      >
        <Form.Item rules={StoreRules.name} name="name" label="Store name">
          <Input placeholder="Enter name store" />
        </Form.Item>
        <Form.Item rules={StoreRules.email} name="email" label="Email">
          <Input placeholder="Enter email" />
        </Form.Item>
        <div className="flex items-center justify-end gap-2">
          <Button
            size="middle"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="default"
            htmlType="submit"
            loading={loading}
            size="middle"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalStoreForm;
