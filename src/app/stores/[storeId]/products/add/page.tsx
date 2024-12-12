"use client";

import FileUpload from "@/components/product/file-upload";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tag,
} from "antd";

const { TextArea } = Input;

const sizes = [
  {
    label: "S",
    value: "S",
  },
  {
    label: "M",
    value: "M",
  },
  {
    label: "L",
    value: "L",
  },
  {
    label: "XL",
    value: "XL",
  },
  {
    label: "XXL",
    value: "XXL",
  },
];

const colors = [
  {
    label: "Red",
    value: "#E15353",
  },
  {
    label: "Blue",
    value: "#5553E1",
  },
  {
    label: "Orange",
    value: "#E1A053",
  },
  {
    label: "Black",
    value: "#000000",
  },
  {
    label: "Green",
    value: "#A3D139",
  },
  {
    label: "Yellow",
    value: "#E1D353",
  },
];

const AddProductPage = () => {
  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Add new product</h3>
      <Form layout="vertical" size="large">
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
                  placeholder="Select brand name"
                  options={[
                    {
                      value: "Nike",
                      label: "Nike",
                    },
                    {
                      value: "Yody",
                      label: "Yody",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select
                  placeholder="Select category"
                  options={[
                    {
                      value: "Shoes",
                      label: "Shoes",
                    },
                    {
                      value: "T-shirt",
                      label: "T-shirt",
                    },
                  ]}
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
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-black transition-colors duration-150 ease-in hover:bg-black hover:text-white"
                    >
                      {size.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <h5 className="font-semibold">Colors</h5>
                <div className="mt-2">
                  <Select
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
                          style={{ backgroundColor: option.data.label }}
                        />
                        <span>{option.data.label}</span>
                      </Space>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 mt-9 flex flex-col gap-2">
            <FileUpload />
            <div className="border p-3 rounded-md">
              <Checkbox>Featured</Checkbox>
              <p className="text-xs text-gray-500 ml-6">
                This product will appear on the hoAddProductPage.
              </p>
            </div>
            <div className="border p-3 rounded-md">
              <Checkbox>Archived</Checkbox>
              <p className="text-xs text-gray-500 ml-6">
                This product will not appear anywhere in the store.
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button variant="solid">Save as Draft</Button>
          <Button variant="solid" color="default" className="ml-2">
            Create Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProductPage;
