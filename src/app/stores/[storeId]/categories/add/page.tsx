"use client";

import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";

const AddCategoryPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { storeId } = useParams<{ storeId: string }>();

  const onFinish = async (values: { name: string }) => {
    try {
      setLoading(true);
      await axios.post(`/api/stores/${storeId}/categories`, values);
      message.success("Create new category successfully!");
      router.push(`/stores/${storeId}/categories`);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Add new category</h3>
      <div className="my-3">
        <h4 className="font-medium">General Information</h4>
        <div className="mt-2">
          <Form
            form={form}
            disabled={loading}
            layout="vertical"
            size="large"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Category Name">
              <Input placeholder="Enter category name" />
            </Form.Item>
            <div className="text-right">
              <Button
                variant="solid"
                color="default"
                className="ml-2"
                htmlType="submit"
                loading={loading}
              >
                Create Category
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
