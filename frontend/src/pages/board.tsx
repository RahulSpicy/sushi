import styled from "@emotion/styled";
import { Button, Typography, Input } from "@mui/material";
import List from "../components/boards/List";
import { v4 as uuidv4 } from "uuid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../components/headers/Header";
import { useState } from "react";

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

const Board = (props) => {
  // const { id } = props.match.params;
  const [addingList, setAddingList] = useState(false);
  const board = {
    title: "Hello World",
    project: "The Boys",
    lists: [{ title: "List1", cards: [] }],
  };

  return (
    <>
      <Header />
      <BoardContainer>
        <Typography variant="h6" fontWeight={500}>
          {board.title}
        </Typography>
        <Typography variant="caption" marginBottom="10px">
          {board.project}
        </Typography>
        <BoardLists>
          {board.lists.map((l) => (
            <List list={l} key={uuidv4()} />
          ))}
          {addingList ? (
            <CreateList />
          ) : (
            <Button
              startIcon={<AddOutlinedIcon />}
              variant="contained"
              sx={{
                height: "fit-content",
                marginLeft: "20px",
              }}
              onClick={() => setAddingList(true)}
            >
              Add another list
            </Button>
          )}
        </BoardLists>
      </BoardContainer>
    </>
  );
};

const CreateList = () => {
  const [title, setTitle] = useState("");
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
      <Button variant="outlined" fullWidth>
        Add List
      </Button>
    </form>
  );
};

export default Board;
