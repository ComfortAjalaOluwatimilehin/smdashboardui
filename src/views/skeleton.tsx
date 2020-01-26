import { Layout, Icon, Row, Col } from "antd";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  RouteComponentProps
} from "react-router-dom";
import menustructurejson from "../auth/menustructure.json";
import { AllOrders } from "./orders/index";
import { AllCustomers } from "./customers/index";
import { WrappedNormalCreateOrdersForm } from "./orders/createorder";
import { SingleOrder } from "./orders/single";
import { Home } from "./home";
const { Header, Sider, Content } = Layout;
export const Skeleton: React.FC<any> = ({ logout, token, children }) => {
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };
  const menulist: Array<{
    icontype: string;
    key: string;
    value: string;
    path: string;
  }> = menustructurejson;
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <section
            style={{
              height: "inherit",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {menulist.map((menu, index) => {
              return (
                <div style={{ width: "100%" }}>
                  <NavLink
                    exact
                    to={menu.path}
                    key={menu.key}
                    style={{
                      fontSize: " 21px",
                      padding: " .5em",
                      boxSizing: "border-box",
                      display: "block"
                    }}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "white"
                    }}
                  >
                    <Icon type={menu.icontype} />
                    <span> {menu.value}</span>
                  </NavLink>
                </div>
              );
            })}
          </section>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Row justify="center">
              <Col xs={2} sm={4} md={20} lg={20} xl={20}>
                <Icon
                  style={{ paddingLeft: "5px" }}
                  className="trigger"
                  type={collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={toggle}
                />
              </Col>
              <Col xs={2} sm={4} md={4} lg={4} xl={4}>
                <Icon
                  type="logout"
                  onClick={() => {
                    logout();
                  }}
                />
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280
            }}
          >
            <Route
              path="/"
              exact
              component={(props: RouteComponentProps) => <Home {...props} />}
            />
            <Route
              path="/orders"
              exact
              component={(props: RouteComponentProps) => (
                <AllOrders {...props} />
              )}
            />
            <Route
              path="/customers"
              exact
              component={(props: RouteComponentProps) => (
                <AllCustomers {...props} />
              )}
            />
            <Route
              path="/createorder"
              exact
              component={(props: RouteComponentProps) => (
                <WrappedNormalCreateOrdersForm {...props} />
              )}
            />
            <Route
              path="/orders/:orderid"
              exact
              component={(props: RouteComponentProps) => (
                <SingleOrder {...props} />
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
