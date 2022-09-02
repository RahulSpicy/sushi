import styled from "@emotion/styled";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import HomeBoard from "../components/boards/HomeBoard";
import AddBoardModal from "../components/modals/AddBoardModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";

const HomeWrapper = styled.div`
  display: flex;
  background-color: #f6f7fb;
  padding: 55px 120px;
  height: 100%;
`;

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25em;
`;

const HomeBoards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
`;

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <HomeWrapper>
      <HomeSidebar />
      <div style={{ flex: 5, marginLeft: "50px" }}>
        <HomeSection>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccessTimeOutlinedIcon />
            <Typography fontWeight={400} variant="h6" ml={1}>
              Recently Viewed
            </Typography>
          </div>
        </HomeSection>
        <HomeBoards>
          <HomeBoard />
        </HomeBoards>
        <HomeSection>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PersonOutlineOutlinedIcon />
            <Typography fontWeight={400} variant="h6" ml={1}>
              Personal Boards
            </Typography>
          </div>
          <IconButton onClick={handleOpen}>
            <AddOutlinedIcon />
          </IconButton>
          <AddBoardModal setOpen={open} handleClose={handleClose} />
        </HomeSection>
        <HomeBoards>
          <HomeBoard />
        </HomeBoards>
      </div>
    </HomeWrapper>
  );
};

export default Home;
