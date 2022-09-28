import { Draggable } from "react-beautiful-dnd";
import DetailCard from "./DetailCard";

interface DraggableCardProps {
  card: any;
  list: any;
  index: number;
}

const DraggableCard = ({ card, list, index }: DraggableCardProps) => {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => {
        if (typeof provided.draggableProps.onTransitionEnd === "function") {
          const anim = window?.requestAnimationFrame(() =>
            provided.draggableProps.onTransitionEnd({
              propertyName: "transform",
            })
          );
        }
        return (
          <DetailCard
            card={card}
            list={list}
            provided={provided}
            isDragging={snapshot.isDragging}
          />
        );
      }}
    </Draggable>
  );
};

export default DraggableCard;
