"use client";

import axios from "axios";
import { useState } from "react";
import { StoreRules } from "@/utils/form-rules";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

const StoreForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: { name: string; email: string }) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);

      router.push(`/stores/${response.data.id}`);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
      message.success("Create new store successfully!");
    }
  };
  return (
    <Form disabled={loading} layout="vertical" size="large" onFinish={onFinish}>
      <Form.Item
        rules={StoreRules.name}
        name="name"
        label="Store Name"
        validateTrigger="onBlur"
      >
        <Input placeholder="Enter store name" />
      </Form.Item>
      <Form.Item
        rules={StoreRules.email}
        name="email"
        label="Email"
        validateTrigger="onBlur"
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <div className="md:text-right">
        <Button
          loading={loading}
          className="w-full md:w-fit"
          variant="solid"
          color="default"
          htmlType="submit"
        >
          Create
        </Button>
      </div>
    </Form>
  );
};

export default StoreForm;
