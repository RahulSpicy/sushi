import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HomeBoard from "../components/boards/HomeBoard";
import AddBoardModal from "../components/modals/AddBoardModal";
import HomeSidebar from "../components/sidebars/HomeSidebar";
import useAxiosGet from "../hooks/useAxiosGet";
import { filterBoards } from "../utils/board";

const Home = () => {
  const [boardProject, setBoardProject] = useState(0); // If 0, we are making a personal board. Else, making board for project with given ID

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setBoardProject(0);
  };
  const handleClose = () => setOpen(false);

  const { data: projects, addItem: addProject } = useAxiosGet("/projects/");
  const {
    data: boards,
    addItem: addBoard,
    replaceItem: replaceBoard,
  } = useAxiosGet("/boards/"); // replaceBoard when you star or unstar
  const [userBoards, projectBoards, starredBoards] = filterBoards(boards);
  const { data: recentlyViewedBoards } = useAxiosGet("/boards/?sort=recent");

  if (!boards) return null;

  return (
    <div className="flex max-h-screen bg-white px-28 py-12">
      <Head>
        <title>Boards | Sushi</title>
      </Head>
      <HomeSidebar projects={projects || []} />
      <div className="flex-[5] ml-12">
        {starredBoards.length !== 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <StarBorderIcon />
                <h1 className="text-xl font-normal font-mono ml-2">
                  Starred Boards
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              {starredBoards.map((board) => (
                <HomeBoard
                  board={board}
                  replaceBoard={replaceBoard}
                  key={uuidv4()}
                />
              ))}
            </div>
          </>
        )}
        {(recentlyViewedBoards || []).length !== 0 &&
          starredBoards.length === 0 && (
            <>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  <AccessTimeOutlinedIcon />
                  <h1 className="text-xl font-normal font-mono ml-2">
                    Recently Viewed
                  </h1>
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                {recentlyViewedBoards.map((board: any) => (
                  <HomeBoard
                    board={board}
                    replaceBoard={replaceBoard}
                    key={uuidv4()}
                  />
                ))}
              </div>
            </>
          )}

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <PersonOutlineOutlinedIcon />
            <h1 className="text-xl font-normal font-mono ml-2">
              Personal Boards
            </h1>
          </div>

          <IconButton onClick={handleOpen}>
            <AddOutlinedIcon />
          </IconButton>
          <AddBoardModal
            setOpen={open}
            handleClose={handleClose}
            addBoard={addBoard}
            project={boardProject}
          />
        </div>
        <div className="flex flex-wrap mb-4">
          {userBoards.map((board) => (
            <HomeBoard
              board={board}
              replaceBoard={replaceBoard}
              key={uuidv4()}
            />
          ))}
        </div>
        {projectBoards.map((project) => (
          <React.Fragment key={uuidv4()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <PeopleAltOutlinedIcon />
                <h1 className="text-xl font-normal font-mono ml-2">
                  {project.title}
                </h1>
              </div>
              <IconButton>
                <AddOutlinedIcon />
              </IconButton>
            </div>
            <div className="flex flex-wrap mb-4 w-[900px]">
              {project.boards.map((board: any) => (
                <HomeBoard
                  board={board}
                  replaceBoard={replaceBoard}
                  key={uuidv4()}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Home;
