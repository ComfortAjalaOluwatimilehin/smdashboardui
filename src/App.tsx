import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { AuthWrapper } from "./internal/authwrapper";
import { authContext } from "./internal/authcontext";
import { observer } from "mobx-react-lite";
import { Skeleton } from "./views/routes";

const App: React.FC = observer(() => {
  return (
    <AuthWrapper>
      <authContext.Consumer>
        {({ logout }) => <Skeleton logout={logout}></Skeleton>}
      </authContext.Consumer>
    </AuthWrapper>
  );
});
export default App;
