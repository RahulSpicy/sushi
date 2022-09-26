import React, { useEffect, useContext } from "react";
import Landing from "./Landing";
import Home from "./Home";
import Header from "../components/headers/Header";
import globalContext from "../context/globalContext";

const Index = () => {
  const { checkAuth, checkedAuth, authUser } = useContext(globalContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!checkedAuth) {
    return null;
  }

  return (
    <>
      {authUser && (
        <>
          <Header />
          <Home />
        </>
      )}
      {!authUser && <Landing />}
    </>
  );
};

export default Index;
