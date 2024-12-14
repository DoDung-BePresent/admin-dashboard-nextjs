import { Rule } from "antd/es/form";

type StoreRulesType = {
  name: Rule[];
  email: Rule[];
};

export const StoreRules: StoreRulesType = {
  name: [
    {
      required: true,
      message: "Store name is required!",
    },
    {
      min: 2,
      message: "Store name must be at least 6 characters long!",
    },
    {
      max: 50,
      message: "Store name cannot exceed 50 characters long!",
    },
  ],
  email: [
    {
      required: true,
      message: "Email is required!",
    },
    {
      type: "email",
      message: "Invalid email address!",
    },
  ],
};
