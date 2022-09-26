import styled from "@emotion/styled";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { IconButton, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
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
`;

const ListAddCard = styled.div`
  margin-top: auto;
  text-align: center;
  font-size: 0.875rem;
  width: 275px;
  padding: 0.75em 0;
  color: gray;
`;

const List = ({ list }: any) => {
  return (
    <ListContainer>
      <ListTitle>
        <Typography ml={2}>{list.title}</Typography>
        <IconButton>
          <MoreHorizOutlinedIcon />
        </IconButton>
      </ListTitle>

      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <ListCards ref={provided.innerRef} {...provided.droppableProps}>
            {list.items.map((card, index) => (
              <DraggableCard
                card={card}
                list={list}
                key={uuidv4()}
                index={index}
              />
            ))}
            {provided.placeholder}
          </ListCards>
        )}
      </Droppable>

      <ListAddCard>Add Card</ListAddCard>
    </ListContainer>
  );
};

export default List;
