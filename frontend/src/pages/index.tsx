import React, { useEffect, useContext } from "react";
import Landing from "./Landing";
import Home from "./Home";
import Header from "../components/headers/Header";
import globalContext from "../context/globalContext";
import { useRouter } from "next/router";

const Index = () => {
  const { checkAuth, checkedAuth, authUser } = useContext(globalContext);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

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
