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
  CheckSquareOutlined
} from "@ant-design/icons";
export interface IMenuItem {
  icon: React.ReactNode | string;
  value: string;
  path: string;
  key: string;
}
export const menustructurejson: Array<IMenuItem> = [
  {
    icon: <AccountBookOutlined />,
    value: "Other products",
    path: "/otherproducts",
    key: "otherproducts",
  },
  {
    icon: <CheckSquareOutlined />,
    value: "Home",
    path: "/",
    key: "home",
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
