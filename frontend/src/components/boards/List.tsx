import styled from "@emotion/styled";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Button, IconButton, Input, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import globalContext from "../../context/globalContext";
import { authAxios } from "../../utils/authAxios";
import { addCard, updateList } from "../../utils/board";
import { backendUrl } from "../../utils/const";
import { mergeRefs } from "../../utils/mergeRefs";
import DraggableCard from "./DraggableCard";

const ListContainer = styled.div`
  background-color: white;
  padding: 0.7em 0.2em 0.7em 0.2em;
  width: fit-content;
  max-height: 97%;
  border: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-right: 1em;
`;

const ListTitle = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListCards = styled.div`
  margin: 0.5em 0;
  max-height: calc(100% - 110px);
  overflow-y: auto;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #E5E5E5; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #F1F1F1; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #DADADA; 
}

`;

const ListAddCard = styled(Button)`
  margin-top: auto;
  text-align: center;
  font-size: 0.875rem;
  width: 275px;
  padding: 0.75em 0;
  color: gray;
  align-self: center;
`;

const List = ({ list, index }: any) => {
  const { board, setBoard } = useContext(globalContext);
  const [addingCard, setAddingCard] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const listCards = useRef(null);

  const onAddCard = async (e) => {
    e.preventDefault();
    if (cardTitle.trim() === "") return;
    const { data } = await authAxios.post(`${backendUrl}/boards/items/`, {
      list: list.id,
      title: cardTitle,
    });
    setAddingCard(false);
    addCard(board, setBoard)(list.id, data);
  };

  useEffect(() => {
    if (addingCard)
      listCards.current.scrollTop = listCards.current.scrollHeight;
  }, [addingCard]);

  return (
    <Draggable draggableId={"list" + list.id.toString()} index={index}>
      {(provided, snapshot) => {
        if (typeof provided.draggableProps.onTransitionEnd === "function") {
          const anim = window?.requestAnimationFrame(() =>
            provided.draggableProps.onTransitionEnd({
              propertyName: "transform",
            })
          );
        }
        return (
          <ListContainer ref={provided.innerRef} {...provided.draggableProps}>
            <ListTitle {...provided.dragHandleProps}>
              {/* <Typography ml={2}>{list.title}</Typography> */}
              {!editingTitle ? (
                <Typography ml={2} onClick={() => setEditingTitle(true)}>
                  {list.title}
                </Typography>
              ) : (
                <EditList list={list} setEditingTitle={setEditingTitle} />
              )}
              <IconButton>
                <MoreHorizOutlinedIcon />
              </IconButton>
            </ListTitle>

            <Droppable droppableId={list.id.toString()} type="item">
              {(provided) => (
                <ListCards
                  ref={mergeRefs(provided.innerRef, listCards)}
                  {...provided.droppableProps}
                >
                  {list.items.map((card: any, index: number) => (
                    <DraggableCard
                      card={card}
                      list={list}
                      index={index}
                      key={uuidv4()}
                    />
                  ))}
                  {provided.placeholder}
                  {addingCard && (
                    <AddCard
                      onAddCard={onAddCard}
                      cardTitle={cardTitle}
                      setCardTitle={setCardTitle}
                    />
                  )}
                </ListCards>
              )}
            </Droppable>

            {!addingCard ? (
              <ListAddCard onClick={() => setAddingCard(true)}>
                Add Card
              </ListAddCard>
            ) : cardTitle.trim() !== "" ? (
              <ListAddCard onClick={onAddCard}>Add</ListAddCard>
            ) : (
              <ListAddCard disabled>Add</ListAddCard>
            )}
          </ListContainer>
        );
      }}
    </Draggable>
  );
};

export default List;

const AddCard = ({ onAddCard, cardTitle, setCardTitle }: any) => (
  <form
    onSubmit={onAddCard}
    style={{
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Input
      type="text"
      name="title"
      placeholder="Enter card title..."
      value={cardTitle}
      onChange={(e) => setCardTitle(e.target.value)}
      sx={{
        width: "90%",
      }}
    />
  </form>
);

const EditList = ({ list, setEditingTitle }: any) => {
  const { board, setBoard } = useContext(globalContext);
  const [listTitle, setListTitle] = useState(list.title);

  const onEditList = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (listTitle.trim() === "") return;
    const { data } = await authAxios.put(
      `${backendUrl}/boards/lists/${list.id}/`,
      {
        title: listTitle,
      }
    );
    updateList(board, setBoard)(data);
    setEditingTitle(false);
  };
  return (
    <form onSubmit={onEditList}>
      <Input
        type="text"
        name="title"
        value={listTitle}
        style={{ marginLeft: "20px" }}
        fullWidth
        onChange={(e) => setListTitle(e.target.value)}
      />
    </form>
  );
};
