"use client";

import { Button, Form, Input } from "antd";

const AddCategoryPage = () => {
  return (
    <div className="container mb-5 md:mb-0">
      <h3 className="font-semibold">Add new category</h3>
      <div className="my-3">
        <h4 className="font-medium">General Information</h4>
        <div className="mt-2">
          <Form layout="vertical" size="large">
            <Form.Item name="name" label="Category Name">
              <Input placeholder="Enter category name" />
            </Form.Item>
            <div className="text-right">
              <Button variant="solid" color="default" className="ml-2">
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
