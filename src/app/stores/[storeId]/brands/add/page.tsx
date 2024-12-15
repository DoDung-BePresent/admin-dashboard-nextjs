"use client";

import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

const AddBrandPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { storeId } = useParams<{ storeId: string }>();

  const onFinish = async (values: { name: string }) => {
    try {
      setLoading(true);

      await axios.post(`/api/stores/${storeId}/brands`, values);
      message.success("Create new brand successfully!");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };
  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Add new brand</h3>
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
            <Form.Item name="name" label="Brand Name">
              <Input placeholder="Enter brand name" />
            </Form.Item>
            <div className="text-right">
              <Button
                variant="solid"
                color="default"
                className="ml-2"
                htmlType="submit"
                loading={loading}
              >
                Create Brand
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddBrandPage;
