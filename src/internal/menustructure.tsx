import React from "react";
import {
  LogoutOutlined,
  AuditOutlined,
  TeamOutlined,
  PhoneOutlined,
  HomeFilled
} from "@ant-design/icons";
export interface IMenuItem {
  icon: React.ReactNode | string;
  value: string;
  path: string;
  key: string;
  onlyAdmin?:true;
}
export const menustructurejson: Array<IMenuItem> = [
  {
    icon: <HomeFilled />,
    value: "home",
    path: "/",
    key: "products",
  },
  {
    icon: <AuditOutlined />,
    value: "Materials",
    path: "/materials",
    key: "materials",
    onlyAdmin:true
  },
  {
    icon: <TeamOutlined />,
    value: "Employees",
    path: "/employees",
    key: "employees",
    onlyAdmin:true
  },
  {
    icon: <PhoneOutlined />,
    value: "contacts",
    path: "/contacts",
    key: "contacts",
    onlyAdmin:true
  },
  {
    icon: <LogoutOutlined />,
    value: "logout",
    path: "logout",
    key: "logout",
  },
];
