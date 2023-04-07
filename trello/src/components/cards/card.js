import React from "react";
import "./card.scss";

function Card(props) {
  const {
    card,
    onDragStart: onCardDragStart,
    onDragOver: onCardDragOver,
  } = props;
  return (
    <li
      id={card._id}
      cardId={card._id}
      className="card-item"
      columnId={card.columnId}
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onCardDragStart(e);
      }}
      onDragOver={(e) => onCardDragOver(e)}
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}

      {card.cardName}
    </li>
  );
}

export default Card;
