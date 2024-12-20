"use client";

import axios from "axios";
import { useState } from "react";
import { Button, ColorPicker, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { AggregationColor } from "antd/es/color-picker/color";

const AddColorPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { storeId } = useParams<{ storeId: string }>();

  const onFinish = async (values: { name: string; code: AggregationColor }) => {
    try {
      setLoading(true);
      await axios.post(`/api/stores/${storeId}/colors`, {
        name: values.name,
        code: values.code.toHexString(),
      });
      message.success("Create new color successfully!");
      router.push(`/stores/${storeId}/colors`);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Add new color</h3>
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
            <Form.Item name="name" label="Color Name">
              <Input placeholder="Enter color name" />
            </Form.Item>
            <Form.Item name="code" label="Color">
              <ColorPicker
                showText
                allowClear
                onChangeComplete={(value) =>
                  form.setFieldValue("name", value.toHexString().toUpperCase())
                }
              />
            </Form.Item>
            <div className="text-right">
              <Button
                variant="solid"
                color="default"
                className="ml-2"
                htmlType="submit"
                loading={loading}
              >
                Create Color
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddColorPage;
