import React, { useState } from "react";
import "./card.scss";

function Card(props) {
  const {
    card,
    onDragStart: onCardDragStart,
    onDragOver: onCardDragOver,
    onDrop,
  } = props;
  // const [isDropCard, setIsDropCard] = useState(false);
  return (
    <li
      cardId={card._id}
      className="card-item"
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onCardDragStart(e, card._id, card.columnId);
      }}
      onDragOver={(e) => onCardDragOver(e, card._id, card.columnId)}
      // onDragEnd={(e) => onCardDragEnd(e, card._id)}
      onDragEnd={(e) => {
        onDrop(e, card._id, card.columnId);
      }}
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.cardName}
    </li>
  );
}

export default Card;
