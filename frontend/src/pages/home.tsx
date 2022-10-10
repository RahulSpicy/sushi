import styled from "@emotion/styled";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton, Typography } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HomeBoard from "../components/boards/HomeBoard";
import AddBoardModal from "../components/modals/AddBoardModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import useAxiosGet from "../hooks/useAxiosGet";
import { filterBoards } from "../utils/board";

const HomeWrapper = styled.div`
  display: flex;
  background-color: offwhite;
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

const BoardContainer = styled.div`
  width: 900px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
`;

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: projects, addItem: addProject } = useAxiosGet("/projects/");
  const { data: boards, addItem: addBoard } = useAxiosGet("/boards/");
  const [userBoards, projectBoards] = filterBoards(boards);
  const { data: recentlyViewedBoards } = useAxiosGet("/boards/?sort=recent");

  if (!boards) return null;

  return (
    <HomeWrapper>
      <Head>
        <title>Boards | Sushi</title>
      </Head>
      <HomeSidebar projects={projects || []} />
      <div style={{ flex: 5, marginLeft: "50px" }}>
        {(recentlyViewedBoards || []).length !== 0 && (
          <>
            <HomeSection>
              <div style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeOutlinedIcon />
                <Typography fontWeight={400} variant="h6" ml={1}>
                  Recently Viewed
                </Typography>
              </div>
            </HomeSection>
            <HomeBoards>
              {recentlyViewedBoards.map((board) => (
                <HomeBoard board={board} key={uuidv4()} />
              ))}
            </HomeBoards>
          </>
        )}

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
          {userBoards.map((board) => (
            <HomeBoard board={board} key={uuidv4()} />
          ))}
        </HomeBoards>
        {projectBoards.map((project) => (
          <React.Fragment key={uuidv4()}>
            <HomeSection>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PeopleAltOutlinedIcon />
                <Typography fontWeight={400} variant="h6" ml={1}>
                  {project.title}
                </Typography>
              </div>
              <IconButton>
                <AddOutlinedIcon />
              </IconButton>
            </HomeSection>
            <BoardContainer>
              {project.boards.map((board) => (
                <HomeBoard board={board} key={uuidv4()} />
              ))}
            </BoardContainer>
          </React.Fragment>
        ))}
      </div>
    </HomeWrapper>
  );
};

export default Home;
