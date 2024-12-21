"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ColorPicker, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { AggregationColor } from "antd/es/color-picker/color";

const ColorPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { storeId, colorId } = useParams<{
    storeId: string;
    colorId: string;
  }>();

  const onFinish = async (values: { name: string; code: AggregationColor }) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${storeId}/colors/${colorId}`, {
        name: values.name,
        code: values.code.toHexString(),
      });
      router.push(`/stores/${storeId}/colors`);
      router.refresh();
      message.success("Update color successfully!");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getColor = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/stores/${storeId}/colors/${colorId}`);
        form.setFieldsValue(res.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getColor();
  }, [storeId, colorId]);

  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Update color</h3>
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
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ColorPage;
