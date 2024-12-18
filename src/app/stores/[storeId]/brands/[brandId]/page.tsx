"use client";

import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandRules } from "@/utils/form-rules";

const UpdateBrandPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { storeId, brandId } = useParams<{
    storeId: string;
    brandId: string;
  }>();

  const onFinish = async (values: { name: string }) => {
    try {
      setLoading(true);

      const res = await axios.patch(
        `/api/stores/${storeId}/brands/${brandId}`,
        values
      );

      form.setFieldsValue(res.data);
      message.success("Update brand successfully!");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getBrand = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/stores/${storeId}/brands/${brandId}`);
        form.setFieldsValue(res.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getBrand();
  }, [storeId, brandId]);

  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Update brand</h3>
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
            <Form.Item rules={BrandRules.name} name="name" label="Brand Name">
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
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrandPage;
