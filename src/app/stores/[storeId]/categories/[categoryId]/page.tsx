"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { CategoryRules } from "@/utils/form-rules";

const CategoryPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { storeId, categoryId } = useParams<{
    storeId: string;
    categoryId: string;
  }>();

  const onFinish = async (values: { name: string }) => {
    try {
      setLoading(true);
      await axios.patch(
        `/api/stores/${storeId}/categories/${categoryId}`,
        values
      );
      router.push(`/stores/${storeId}/categories`);
      router.refresh();
      message.success("Update category successfully!");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/stores/${storeId}/categories/${categoryId}`
        );
        form.setFieldsValue(res.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, [storeId, categoryId]);

  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Update category</h3>
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
            <Form.Item
              rules={CategoryRules.name}
              name="name"
              label="Category Name"
            >
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
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
