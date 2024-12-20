"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { sizes } from "@/constants/sizes";
import { getColors } from "@/actions/get-colors";
import { getBrands } from "@/actions/get-brands";
import { getCategories } from "@/actions/get-categories";
import FileUpload from "@/components/product/file-upload";

import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  SelectProps,
  Space,
  Tag,
} from "antd";

const { TextArea } = Input;

const AddProductPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<SelectProps["options"]>([]);
  const [colors, setColors] = useState<SelectProps["options"]>([]);
  const [categories, setCategories] = useState<SelectProps["options"]>([]);
  const [images, setImages] = useState<
    { id: string; url: string; alt: string | undefined }[]
  >([]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [fetchedCategories, fetchedBrands, fetchedColors] =
          await Promise.all([
            getCategories(storeId),
            getBrands(storeId),
            getColors(storeId),
          ]);

        const formattedCategories = fetchedCategories.map((category) => ({
          label: category.name,
          value: category.id,
        }));

        const formattedBrands = fetchedBrands.map((brand) => ({
          label: brand.name,
          value: brand.id,
        }));

        const formattedColors = fetchedColors.map((color) => ({
          label: color.name,
          value: color.code,
          id: color.id,
        }));

        setCategories(formattedCategories);
        setBrands(formattedBrands);
        setColors(formattedColors);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [storeId]);

  const onFinish = async (values: {
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    gender: string;
    images: { id: string; url: string; alt: string | undefined }[];
    sizes: string[];
    colors: string[];
  }) => {
    try {
      setLoadingForm(true);
      const selectedColorIds = values.colors.map((value: string) => {
        const color = colors?.find((color) => color.value === value);
        return color?.id;
      });

      values.colors = selectedColorIds;
      values.sizes = selectedSizes;

      const res = await axios.post("/api/upload", {
        files: images,
        folderName: "products",
      });

      values.images = res.data.data;

      await axios.post(`/api/stores/${storeId}/products`, values);

      message.success("Create new product successfully!");
      router.push(`/stores/${storeId}/products`);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Add new product</h3>
      <Form
        form={form}
        layout="vertical"
        size="large"
        onFinish={onFinish}
        disabled={loadingForm}
      >
        <div className="grid md:grid-cols-5 my-3 gap-4">
          <div className="md:col-span-3 bg-white rounded-md">
            <h4 className="font-medium">General Information</h4>
            <div className="grid md:grid-cols-4 md:gap-4 mt-2">
              <Form.Item
                name="name"
                label="Product Name"
                className="md:col-span-2"
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item name="brand" label="Brand Name">
                <Select
                  loading={loading}
                  placeholder="Select brand name"
                  options={brands}
                />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select
                  loading={loading}
                  placeholder="Select category"
                  options={categories}
                />
              </Form.Item>
            </div>
            <Form.Item name="description" label="Description">
              <TextArea
                placeholder="Enter the description of product"
                rows={7}
                style={{ resize: "none" }}
              />
            </Form.Item>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <Form.Item name="price" label="Price">
                <InputNumber<number>
                  min={0}
                  max={1000}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  defaultValue={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item name="discount" label="Discount Percent">
                <InputNumber<number>
                  min={0}
                  max={100}
                  formatter={(value) => `% ${value}`}
                  parser={(value) =>
                    value?.replace("%", "") as unknown as number
                  }
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item name="quantity" label="Quantity">
                <InputNumber<number>
                  min={0}
                  type="number"
                  max={100}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Select
                  placeholder="Select gender"
                  options={[
                    {
                      value: "male",
                      label: "Male",
                    },
                    {
                      value: "female",
                      label: "Female",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="">
                <h5 className="font-semibold">Sizes</h5>
                <div className="flex flex-row gap-2 mt-2">
                  {sizes.map((size, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md border border-black transition-colors duration-150 ease-in hover:bg-black hover:text-white hover:cursor-pointer",
                        {
                          "bg-black text-white": selectedSizes.includes(
                            size.value
                          ),
                        },
                        {
                          "cursor-not-allowed bg-gray-500 hover:cursor-not-allowed text-white hover:bg-gray-500":
                            loadingForm === true,
                        }
                      )}
                      onClick={() => toggleSize(size.value)}
                    >
                      {size.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <Form.Item name="colors" label="Colors">
                  <Select
                    loading={loading}
                    mode="multiple"
                    className="w-full"
                    placeholder="Select color"
                    options={colors}
                    maxTagCount="responsive"
                    tagRender={({ label, value, closable, onClose }) => (
                      <Tag
                        color={value}
                        closable={closable}
                        onClose={onClose}
                        style={{ marginInlineEnd: 4 }}
                      >
                        {label}
                      </Tag>
                    )}
                    optionRender={(option) => (
                      <Space>
                        <div
                          className="h-4 w-4 rounded-sm"
                          style={{ backgroundColor: `${option.data.value}` }}
                        />
                        <span>{option.data.label}</span>
                      </Space>
                    )}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 mt-9 flex flex-col gap-2">
            <FileUpload images={images} setImages={setImages} />
            <div className="border p-3 rounded-md">
              <Checkbox disabled={true}>Featured</Checkbox>
              <p className="text-xs text-gray-500 ml-6">
                This product will appear on the hoAddProductPage.
              </p>
            </div>
            <div className="border p-3 rounded-md">
              <Checkbox disabled={true}>Archived</Checkbox>
              <p className="text-xs text-gray-500 ml-6">
                This product will not appear anywhere in the store.
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button variant="solid">Save as Draft</Button>
          <Button
            variant="solid"
            color="default"
            className="ml-2"
            htmlType="submit"
          >
            Create Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProductPage;
