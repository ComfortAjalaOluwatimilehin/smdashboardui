import React from "react";
import {
  HomeFilled,
  DollarCircleOutlined,
  TagOutlined,
  PaperClipOutlined,
  LogoutOutlined,
  AuditOutlined,
  TeamOutlined,
  PhoneOutlined,
  AccountBookOutlined,
  UserAddOutlined
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
    value: "Home",
    path: "/",
    key: "home",
  },
  {
    icon: <DollarCircleOutlined />,
    value: "Create Sales",
    path: "/createsales",
    key: "createsales",
  },
  {
    icon: <TagOutlined />,
    value: "Create Expenses",
    path: "/createexpenses",
    key: "createexpenses",
  },
  {
    icon: <AccountBookOutlined />,
    value: "Other products",
    path: "/otherproducts",
    key: "otherproducts",
  },
  {
    icon: <PaperClipOutlined />,
    value: "Pay Outstanding",
    path: "/payoutstanding",
    key: "payoutstanding",
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
    icon: <UserAddOutlined />,
    value: "customers",
    path: "/customers",
    key: "customers",
  },
  {
    icon: <LogoutOutlined />,
    value: "logout",
    path: "logout",
    key: "logout",
  },
];
