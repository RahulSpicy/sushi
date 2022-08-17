import React, { useState } from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import Landing from "./Landing";
import DetailCard from "../components/boards/DetailCard";
import Header from "../components/headers/Header";

const Index = () => {
  const [showTeamModal, setShowTeamModal] = useState(true);
  return <DetailCard />;
};

export default Index;
