import { Menu } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Home } from "./home";
import { CreateSales } from "./stats/create";
import { CreateExpenses } from "./expenses/create";
import { CreatePaidOutstanding } from "./outstandings/create";
import { GeneralStyles } from "./generalstyling";
import { menustructurejson, IMenuItem } from "../auth/menustructure";
import { Materials } from "./materials/material";
import { Employees } from "./employees/employee";
import { Contacts } from "./contacts/contacts";

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
  return (
    <div>
      <Menu onClick={handleMenuOnClick} mode="horizontal">
        {menustructurejson.map((menu: IMenuItem, index: number) => {
          return (
            <Menu.Item key={menu.path} icon={menu.icon} title={menu.value} />
          );
        })}
      </Menu>
    </div>
  );
};
export const Skeleton: React.FC<any> = ({ logout, token, children }) => {
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
          /> <Route
          path="/contacts"
          exact
          component={(props: RouteComponentProps) => (
            <Contacts {...props} />
          )}
        />
        </div>
      </main>
    </Router>
  );
};
