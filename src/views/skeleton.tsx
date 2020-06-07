import { Layout, Menu } from "antd";
import Icon, { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import menustructurejson from "../auth/menustructure.json";
import { Home } from "./home";
import { CreateSales } from "./stats/createsale";
import { CreateExpenses } from "./stats/createexpense";
import { CreatePaidOutstanding } from "./stats/createpoustanding";
import { GeneralStyles } from "./generalstyling";
const { Header, Content } = Layout;
export const Skeleton: React.FC<any> = ({ logout, token, children }) => {
  const menulist: Array<{
    icontype: string;
    key: string;
    value: string;
    path: string;
  }> = menustructurejson;
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <GeneralStyles />
        <Header className="header">
          <div className="logo" />
        </Header>

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              {menulist.map((menu, index) => {
                return (
                  <Menu.Item key="1">
                    <NavLink
                      exact
                      to={menu.path}
                      key={menu.key}
                      style={{
                        fontSize: " 21px",
                        padding: " .5em",
                        boxSizing: "border-box",
                        display: "block",
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      <Icon type={menu.icontype} />
                      <span> {menu.value}</span>
                    </NavLink>
                  </Menu.Item>
                );
              })}

              <Menu.Item key="logout">
                <a
                  href="#/"
                  onClick={() => {
                    logout();
                  }}
                  style={{
                    fontSize: " 21px",
                    padding: "0.5em",
                    boxSizing: "border-box",
                    display: " block",

                    color: "white",
                  }}
                >
                  <LogoutOutlined />
                  <span>Logout</span>
                </a>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
            }}
          >
            <Route
              path="/"
              exact
              component={(props: RouteComponentProps) => <Home {...props} />}
            />
            <Route
              path="/createsales"
              exact
              component={(props: RouteComponentProps) => (
                <CreateSales {...props} />
              )}
            />
            <Route
              path="/createexpenses"
              exact
              component={(props: RouteComponentProps) => (
                <CreateExpenses {...props} />
              )}
            />
            <Route
              path="/payoutstanding"
              exact
              component={(props: RouteComponentProps) => (
                <CreatePaidOutstanding {...props} />
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
