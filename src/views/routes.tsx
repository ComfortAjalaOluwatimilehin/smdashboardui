import { Menu } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { GeneralStyles } from "./generalstyling";
import { menustructurejson, IMenuItem } from "../internal/menustructure";
import { Materials } from "./materials/material";
import { Employees } from "./employees/employee";
import { Contacts } from "./contacts/contacts";
import { Customers } from "./customers/customers";
import { OtherProducts } from "./otherproducts";
import { observer } from "mobx-react-lite";
import { AuthStore } from "../internal/auth.store";

const TQMenu: React.FC<any> = (props) => {
  const handleMenuOnClick = ({
    key,
  }: {
    item: any;
    key: any;
    keyPath: any;
    domEvent: any;
  }) => {
    if (key === "logout") {
      props.logout();
    } else {
      props.history.push(key);
    }
  };
  const currentPath = props.location ? props.location.pathname : undefined;
  const defaultSelectedKeys = currentPath ? [currentPath] : [];
  return (
    <div>
      <Menu
        onClick={handleMenuOnClick}
        mode="horizontal"
        defaultSelectedKeys={defaultSelectedKeys}
      >
        {/** if current user is guest and menu is only admin */}
        {menustructurejson
          .filter((menu) => {
            if (AuthStore.isGuest) {
              if (menu.onlyAdmin) {
                return false;
              }
              return true;
            } else {
              return true;
            }
          })
          .map((menu: IMenuItem, index: number) => {
            return (
              <Menu.Item key={menu.path} icon={menu.icon} title={menu.value} />
            );
          })}
      </Menu>
    </div>
  );
};
export const Skeleton: React.FC<any> = observer(
  ({ logout, token, children }) => {
    return (
      <Router>
        <main>
          <GeneralStyles />
          <p id="tqsalesmanager">TQ Sales Manager</p>
          <div>
            <Route
              path="/"
              component={(props: RouteComponentProps) => (
                <TQMenu {...props} logout={logout} />
              )}
            />
            <Route
              path="/materials"
              exact
              component={(props: RouteComponentProps) => (
                <Materials {...props} />
              )}
            />
            <Route
              path="/employees"
              exact
              component={(props: RouteComponentProps) => (
                <Employees {...props} />
              )}
            />{" "}
            <Route
              path="/contacts"
              exact
              component={(props: RouteComponentProps) => (
                <Contacts {...props} />
              )}
            />
            <Route
              path="/customers"
              exact
              component={(props: RouteComponentProps) => (
                <Customers {...props} />
              )}
            />
            <Route
              path="/"
              exact
              component={(props: RouteComponentProps) => (
                <OtherProducts {...props} />
              )}
            />
          </div>
        </main>
      </Router>
    );
  }
);
