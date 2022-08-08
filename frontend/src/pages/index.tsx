import React, { useState } from "react";
import CardOld from "../components/boards/CardOld";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import Landing from "./Landing";

import DetailCard from "../components/boards/DetailCard";
const Index = () => {
  const [showTeamModal, setShowTeamModal] = useState(true);
  return <CreateTeamModal setShowModal={setShowTeamModal} />;
};

export default Index;
