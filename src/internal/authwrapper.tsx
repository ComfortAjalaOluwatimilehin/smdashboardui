import { toJS } from "mobx";
import { observer, useObservable } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { AuthStore } from "./auth.store";
import { authContext } from "./authcontext";
import { WrappedNormalLoginForm } from "./login.";
import { Wrapper } from "./wrapper";
export const AuthWrapper: React.FC<any> = observer(({ children }:{children:any}) => {
  const store = useObservable(AuthStore);
  let { isValid, initcomplete } = store;
  isValid = toJS(isValid);
  initcomplete = toJS(initcomplete);
  useEffect(() => {
    console.log("isvalid" ,isValid);
  }, [isValid]);

  return (
    <Fragment>
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
              handlelogin={(values:any) => store.login(values)}
            />
          )}
        </Wrapper>
      )}
    </Fragment>
  );
});
