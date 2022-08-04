import React, { useState } from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import Landing from "./Landing";
const Index = () => {
  const [showTeamModal, setShowTeamModal] = useState(true);
  return <CreateTeamModal setShowModal={setShowTeamModal} />;
};

export default Index;
