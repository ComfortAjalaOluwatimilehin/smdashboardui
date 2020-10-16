import React from "react";
import {
  HomeFilled,
  DollarCircleOutlined,
  TagOutlined,
  PaperClipOutlined,
  LogoutOutlined,
AuditOutlined, TeamOutlined
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
    path: "/createemployees",
    key: "createemployees",
  },
  {
    icon: <LogoutOutlined />,
    value: "logout",
    path: "logout",
    key: "logout",
  },
];
