import { Menu } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Home } from "./home";
import { CreateSales } from "./stats/createsale";
import { CreateExpenses } from "./stats/createexpense";
import { CreatePaidOutstanding } from "./stats/createpoustanding";
import { GeneralStyles } from "./generalstyling";
import { menustructurejson, IMenuItem } from "../auth/menustructure";

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
        </div>
      </main>
    </Router>
  );
};
