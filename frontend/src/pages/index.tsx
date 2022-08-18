import React, { useState, useEffect, useContext } from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import Landing from "./Landing";
import DetailCard from "../components/boards/DetailCard";
import Header from "../components/headers/Header";
import globalContext from "../context/globalContext";
import Login from "./login";

const Index = () => {
  const { checkAuth, checkedAuth, user } = useContext(globalContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!checkedAuth) {
    return null;
  }

  // const [showTeamModal, setShowTeamModal] = useState(true);
  return <>{user ? <p>Logged In</p> : <Landing />}</>;
};

export default Index;
