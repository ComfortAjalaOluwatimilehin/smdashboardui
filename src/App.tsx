import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { AuthWrapper } from "./auth/authwrapper";
import { Button } from "antd";
import { authContext } from "./auth/authcontext";
import { observer } from "mobx-react-lite";

const App: React.FC = observer(() => {
  return (
    <AuthWrapper>
      <authContext.Consumer>
        {({ token, logout }) => (
          <>
            <h1>Hello, you are logged in</h1>
            <Button
              type="primary"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </authContext.Consumer>
    </AuthWrapper>
  );
});
export default App;
