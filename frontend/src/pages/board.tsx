import styled from "@emotion/styled";
import { Button, Typography, Input } from "@mui/material";
import List from "../components/boards/List";
import { v4 as uuidv4 } from "uuid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../components/headers/Header";
import { useState } from "react";
import { useRouter } from "next/router";
import { DragDropContext } from "react-beautiful-dnd";

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
        title: "List1",
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

  const onDragEnd = (result) => {
    // Must update state synchromously so hit endpoint after setState
    // A bit optimistic but a must
    const { source, destination, draggableId } = result;

    if (!destination) return; // Dropped outside of list
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return; // Position didn't change

    const sourceList = board.lists.find(
      (list) => list.id.toString() === source.droppableId
    );
    const item = sourceList.items.find(
      (item) => item.id.toString() === draggableId
    );
    const destinationList = board.lists.find(
      (list) => list.id.toString() === destination.droppableId
    );

    const newItems = [...sourceList.items];
    let newItems2;
    if (source.droppableId === destination.droppableId) {
      newItems2 = newItems;
    } else {
      newItems2 = [...destinationList.items];
    }
    newItems.splice(source.index, 1);
    newItems2.splice(destination.index, 0, item);

    const newList = {
      ...sourceList,
      items: newItems,
    };

    const newList2 = {
      ...destinationList,
      items: newItems2,
    };

    const newLists = board.lists.map((list) => {
      if (list.id === newList.id) return newList;
      else if (list.id === newList2.id) return newList2;
      return list;
    });

    const newBoard = {
      ...board,
      lists: newLists,
    };

    setBoard(newBoard);
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
        <DragDropContext onDragEnd={onDragEnd}>
          <BoardLists>
            {board.lists.map((list) => (
              <List list={list} key={uuidv4()} />
            ))}
            {addingList ? (
              <CreateList />
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
        </DragDropContext>
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
