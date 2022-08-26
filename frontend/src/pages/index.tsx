import React, { useState, useEffect, useContext } from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import Landing from "./Landing";
import Home from "./home";
import Header from "../components/headers/Header";
import globalContext from "../context/globalContext";
import Login from "./login";
import DetailCard from "../components/boards/DetailCard";

const card = {
  title: "Sansh",
  labels: ["Urgent"],
  assigned_to: [],
  attachments: ["abc.jpg"],
  comments: [],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
};

const Index = () => {
  const { checkAuth, checkedAuth, user } = useContext(globalContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!checkedAuth) {
    return null;
  }

  // const [showTeamModal, setShowTeamModal] = useState(true);
  return (
    <>
      {user && (
        <>
          <Header />
          <DetailCard cardData={card} />
        </>
      )}
      {!user && <Landing />}
    </>
  );
};

export default Index;
