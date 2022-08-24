import React, { useState, useEffect, useContext } from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import Landing from "./Landing";
import Header from "../components/headers/Header";
import globalContext from "../context/globalContext";
import Login from "./login";
import Card from "../components/boards/Card";
import { Button } from "@mui/material";
import LabelModal from "../components/modals/LabelModal";

const card = {
  title: "Sansh",
  labels: ["Urgent"],
  assigned_to: [],
  attachments: [],
  comments: [],
  description: "hahahahah",
};

const Index = () => {
  const { checkAuth, checkedAuth, user } = useContext(globalContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button onClick={handleOpen}>Open modal</Button>
          <LabelModal />
          <Card setOpen={open} handleClose={handleClose} cardData={card} />
        </>
      )}{" "}
      {!user && <Landing />}
    </>
  );
};

export default Index;
