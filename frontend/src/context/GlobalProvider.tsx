import React, { useReducer } from "react";
import { useRouter } from "next/router";
import { globalReducer, LOGIN, LOGOUT } from "./globalReducer";
import globalContext from "./globalContext";

interface GlobalProviderProps {
  children: React.ReactNode;
}

interface loginProps {
  access: string;
  refresh: string;
}

const GlobalProvider = (props: GlobalProviderProps) => {
  const router = useRouter();
  const [globalState, dispatch] = useReducer(globalReducer, {
    authenticated: false,
    synced: false,
  });

  const login = (resData: loginProps) => {
    localStorage.setItem("accessToken", resData.access);
    localStorage.setItem("refreshToken", resData.refresh);
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
