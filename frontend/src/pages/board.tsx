import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import List from "../components/boards/List";
import { v4 as uuidv4 } from "uuid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const BoardContainer = styled.div`
  background-color: #f6f7fb;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding: 100px 50px 40px;
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
  //   const { id } = props.match.params;
  const board = {
    title: "Hello World",
    project: "The Boys",
    lists: [{ title: "List1", cards: [] }],
  };

  return (
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
        <Button
          startIcon={<AddOutlinedIcon />}
          variant="contained"
          sx={{
            height: "fit-content",
            marginLeft: "20px",
          }}
        >
          Add another list
        </Button>
      </BoardLists>
    </BoardContainer>
  );
};

export default Board;
