import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { authAxios } from "../utils/authAxios";
import { backendUrl } from "../utils/const";
import globalContext from "./globalContext";
import {
  globalReducer,
  LOGIN,
  LOGOUT,
  SET_BOARD_CONTEXT,
} from "./globalReducer";

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
    authUser: null,
    checkedAuth: false,
    board: null,
    setBoard: null,
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

  const setBoardContext = (board: any, setBoard: any) => {
    dispatch({ type: SET_BOARD_CONTEXT, board, setBoard });
  };

  return (
    <globalContext.Provider
      value={{
        authUser: globalState.authUser,
        checkedAuth: globalState.checkedAuth,
        board: globalState.board,
        setBoard: globalState.setBoard,
        checkAuth,
        login,
        logout,
        setBoardContext,
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
