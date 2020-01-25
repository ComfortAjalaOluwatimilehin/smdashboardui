import React, { useEffect } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { AuthStore } from "./auth.store";
import { Wrapper } from "./wrapper";
import { authContext } from "./authcontext";
import { WrappedNormalLoginForm } from "./login.";
import { toJS } from "mobx";
export const AuthWrapper: React.FC<any> = observer(({ children }) => {
  const store = useObservable(AuthStore);
  let { isValid, initcomplete } = store;
  isValid = toJS(isValid);
  initcomplete = toJS(initcomplete);
  useEffect(() => {
    console.log("already rendered");
  }, [isValid]);

  return (
    <React.Fragment>
      {initcomplete && (
        <Wrapper>
          {isValid ? (
            <authContext.Provider
              value={{
                logout: () => store.logout()
              }}
            >
              {children}
            </authContext.Provider>
          ) : (
            <WrappedNormalLoginForm
              handlelogin={values => store.login(values)}
            />
          )}
        </Wrapper>
      )}
    </React.Fragment>
  );
});
