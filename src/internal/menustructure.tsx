import React from "react";
import {
  DollarCircleOutlined,
  TagOutlined,
  PaperClipOutlined,
  LogoutOutlined,
  AuditOutlined,
  TeamOutlined,
  PhoneOutlined,
  AccountBookOutlined,
  UserAddOutlined,
  CheckSquareOutlined,
  HomeFilled
} from "@ant-design/icons";
export interface IMenuItem {
  icon: React.ReactNode | string;
  value: string;
  path: string;
  key: string;
}
export const menustructurejson: Array<IMenuItem> = [
  {
    icon: <HomeFilled />,
    value: "home",
    path: "/",
    key: "products",
  },
  {
    icon: <TagOutlined />,
    value: "Create Expenses",
    path: "/createexpenses",
    key: "createexpenses",
  },
  {
    icon: <AuditOutlined />,
    value: "Materials",
    path: "/materials",
    key: "materials",
  },
  {
    icon: <TeamOutlined />,
    value: "Employees",
    path: "/employees",
    key: "employees",
  },
  {
    icon: <PhoneOutlined />,
    value: "contacts",
    path: "/contacts",
    key: "contacts",
  },
  {
    icon: <LogoutOutlined />,
    value: "logout",
    path: "logout",
    key: "logout",
  },
];
