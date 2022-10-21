import styled from "@emotion/styled";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Input, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import List from "../../components/boards/List";
import Header from "../../components/headers/Header";
import { addList, onDragEnd } from "../../utils/board";
import Head from "next/head";
import { backendUrl } from "../../utils/const";
import { authAxios } from "../../utils/authAxios";
import useAxiosGet from "../../hooks/useAxiosGet";
import globalContext from "../../context/globalContext";
import FourOhFour from "../404";

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
  const [editingTitle, setEditingTitle] = useState(false);

  const [addingList, setAddingList] = useState(false);
  const {
    data: board,
    setData: setBoard,
    loading,
  } = useAxiosGet(`/boards/${id}/`);

  const { setBoardContext } = useContext(globalContext);

  useEffect(() => {
    if (board) {
      setBoardContext(board, setBoard);
    }
  }, [board]);

  if (!board && loading) return null;
  if (!board && !loading) return <FourOhFour />;

  return (
    <>
      <Head>
        <title>{board ? `${board.title} | Sushi` : ""}</title>
      </Head>
      <Header />
      <BoardContainer>
        {!editingTitle ? (
          <Typography
            variant="h6"
            fontWeight={500}
            onClick={() => setEditingTitle(true)}
          >
            {board.title}
          </Typography>
        ) : (
          <EditBoard
            board={board}
            setEditingTitle={setEditingTitle}
            setBoard={setBoard}
          />
        )}

        <Typography variant="caption" marginBottom="10px">
          {board.owner.title}
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
                  <List list={list} index={index} key={uuidv4()} />
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
                    Add {board.lists.length === 0 ? "a" : "another"} list
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
        <Button variant="outlined" fullWidth onClick={onAddList}>
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

const EditBoard = ({ board, setBoard, setEditingTitle }) => {
  const [title, setTitle] = useState(board.title);

  const onEditTitle = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    const { data } = await authAxios.put(`${backendUrl}/boards/${board.id}/`, {
      title,
    });
    setBoard(data);
    setEditingTitle(false);
  };
  return (
    <form onSubmit={onEditTitle}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        placeholder="Enter board title"
      />
    </form>
  );
};
export default Board;
