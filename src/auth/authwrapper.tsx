import React, { useEffect } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { AuthStore } from "./auth.store";
import { Wrapper } from "./wrapper";
import { authContext } from "./authcontext";
import { WrappedNormalLoginForm } from "./login.";
export const AuthWrapper: React.FC<any> = observer(({ children }) => {
  const store = useObservable(AuthStore);
  const { token } = store;
  useEffect(() => {
    console.log("already rendered");
  }, [token]);

  return (
    <React.Fragment>
      <Wrapper>
        {token ? (
          <authContext.Provider
            value={{
              token,
              logout: () => store.logout()
            }}
          >
            {children}
          </authContext.Provider>
        ) : (
          <WrappedNormalLoginForm handlelogin={values => store.login(values)} />
        )}
      </Wrapper>
    </React.Fragment>
  );
});
