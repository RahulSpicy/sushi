import styled from "@emotion/styled";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Input, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import List from "../components/boards/List";
import Header from "../components/headers/Header";
import { addList, onDragEnd } from "../utils/board";
import Head from "next/head";
import { backendUrl } from "../utils/const";
import { authAxios } from "../utils/authAxios";

const BoardContainer = styled.div`
  background-color: #f6f7fb;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding: 40px 40px 40px;
  display: flex;
  flex-direction: column;
`;

const BoardLists = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  overflow-x: auto;

  & > .list {
    margin: 0.5em 1em 0;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Board = ({}) => {
  const router = useRouter();
  const id = router.query.id;

  const [addingList, setAddingList] = useState(false);
  const [board, setBoard] = useState({
    id: 1,
    title: "Hello World",
    project: "The Boys",
    lists: [
      {
        id: 1,
        title: "List1",
        items: [
          {
            id: 1,
            title: "Hello",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
          {
            id: 2,
            title: "Hello2",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
          {
            id: 3,
            title: "Hello3",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
          {
            id: 4,
            title: "Hello4",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
        ],
      },
      {
        id: 2,
        title: "List2",
        items: [
          {
            id: 5,
            title: "Hello",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
          {
            id: 6,
            title: "Hello2",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
          {
            id: 7,
            title: "Hello3",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
          {
            id: 8,
            title: "Hello4",
            description: "",
            assigned_to: [],
            labels: [],
            attachments: [],
            comments: [],
          },
        ],
      },
    ],
  }); // Get using route params

  return (
    <>
      <Head>
        <title>{board ? `${board.title} | Sushi` : ""}</title>
      </Head>
      <Header />
      <BoardContainer>
        <Typography variant="h6" fontWeight={500}>
          {board.title}
        </Typography>
        <Typography variant="caption" marginBottom="10px">
          {board.project}
        </Typography>
        <DragDropContext onDragEnd={onDragEnd(board, setBoard)}>
          <Droppable
            droppableId={"board" + board.id.toString()}
            direction="horizontal"
            type="list"
          >
            {(provided) => (
              <BoardLists ref={provided.innerRef} {...provided.droppableProps}>
                {board.lists.map((list, index) => (
                  <List
                    list={list}
                    index={index}
                    key={uuidv4()}
                    board={board}
                    setBoard={setBoard}
                  />
                ))}
                {provided.placeholder}
                {addingList ? (
                  <CreateList
                    board={board}
                    setBoard={setBoard}
                    setAddingList={setAddingList}
                  />
                ) : (
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    variant="contained"
                    sx={{
                      height: "fit-content",
                    }}
                    onClick={() => setAddingList(true)}
                  >
                    Add another list
                  </Button>
                )}
              </BoardLists>
            )}
          </Droppable>
        </DragDropContext>
      </BoardContainer>
    </>
  );
};

const CreateList = ({ board, setBoard, setAddingList }: any) => {
  const [title, setTitle] = useState("");

  const onAddList = async (e) => {
    e.preventDefault();
    const { data } = await authAxios.post(`${backendUrl}/boards/lists/`, {
      board: board.id,
      title,
    });
    addList(board, setBoard)(data);
    setAddingList(false);
  };
  return (
    <form
      style={{
        width: "300px",
        minWidth: "300px",
        padding: "1em",
        marginTop: "0.5em",
        marginLeft: "1em",
        backgroundColor: "white",
        height: "fit-content",
        borderRadius: "5px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      onSubmit={onAddList}
    >
      <Input
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        placeholder="Enter list title"
        sx={{ marginBottom: "1em" }}
      />
      {title.trim() !== "" ? (
        <Button variant="outlined" fullWidth>
          Add List
        </Button>
      ) : (
        <Button variant="outlined" fullWidth disabled>
          Add List
        </Button>
      )}
    </form>
  );
};

export default Board;
