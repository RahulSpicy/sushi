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
  assigned_to: [
    {
      id: "1",
      full_name: "Sushi",
      image: "",
    },
    {
      id: "2",
      full_name: "Cookie Monster",
      image: "",
    },
    {
      id: "3",
      full_name: "Raze",
      image: "",
    },
    {
      id: "4",
      full_name: "Jett",
      image: "",
    },
  ],
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
