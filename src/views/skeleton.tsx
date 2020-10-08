import { Menu } from "antd";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Home } from "./home";
import { CreateSales } from "./subviews/createsale";
import { CreateExpenses } from "./subviews/createexpense";
import { CreatePaidOutstanding } from "./subviews/createpoustanding";
import { GeneralStyles } from "./generalstyling";
import { menustructurejson, IMenuItem } from "../auth/menustructure";
import { CreateMaterial } from "./subviews/creatematerial";
import { CreateEmployee } from "./subviews/createemployee";

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
            path="/creatematerial"
            exact
            component={(props: RouteComponentProps) => (
              <CreateMaterial {...props} />
            )}
          />
          <Route
            path="/createemployees"
            exact
            component={(props: RouteComponentProps) => (
              <CreateEmployee {...props} />
            )}
          />
        </div>
      </main>
    </Router>
  );
};
