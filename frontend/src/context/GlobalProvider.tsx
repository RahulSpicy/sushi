import React, { useReducer } from "react";
import { useRouter } from "next/router";
import { globalReducer, LOGIN, LOGOUT } from "./globalReducer";
import globalContext from "./globalContext";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = (props: GlobalProviderProps) => {
  const router = useRouter();
  const [globalState, dispatch] = useReducer(globalReducer, {
    authenticated: false,
    synced: false,
  });

  const login = (resData: any) => {
    dispatch({ type: LOGIN });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    router.push("/");
  };

  return (
    <globalContext.Provider
      value={{
        authenticated: globalState.authenticated,
        synced: globalState.synced,
        login,
        logout,
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
