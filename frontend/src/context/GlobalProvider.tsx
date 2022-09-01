import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { authAxios } from "../utils/authAxios";
import { backendUrl } from "../utils/const";
import globalContext from "./globalContext";
import { globalReducer, LOGIN, LOGOUT } from "./globalReducer";

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
    user: null,
    checkedAuth: false,
  });

  const login = async (resData: loginProps) => {
    localStorage.setItem("accessToken", resData.access);
    localStorage.setItem("refreshToken", resData.refresh);
    const url = backendUrl + "/me/";

    // No try catch block so error bubbles up to LoginForm to be handled there
    const { data: user } = await authAxios.get(url);
    dispatch({ type: LOGIN, user });
    router.push("/");
  };

  const checkAuth = async () => {
    const url = backendUrl + "/me/";
    try {
      const { data: user } = await authAxios.get(url);
      dispatch({ type: LOGIN, user });
    } catch (err) {
      dispatch({ type: LOGOUT });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    router.push("/login");
  };

  return (
    <globalContext.Provider
      value={{
        user: globalState.user,
        checkedAuth: globalState.checkedAuth,
        checkAuth,
        login,
        logout,
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
