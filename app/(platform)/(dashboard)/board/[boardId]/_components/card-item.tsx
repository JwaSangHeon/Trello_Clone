"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardMadal } from "@/hooks/use-card-modal";

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  const { onOpen } = useCardMadal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          onClick={() => onOpen(data.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent hover:border-black
            py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </li>
      )}
    </Draggable>
  );
};
