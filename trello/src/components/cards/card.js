import React, { useState } from "react";
import "./card.scss";

function Card(props) {
  const {
    card,
    columnId,
    onDragStart: onCardDragStart,
    onDragOver: onCardDragOver,
    // onDrop,
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
      {card._id.substr(-6)}
      -----
      {card.cardName}
    </li>
  );
}

export default Card;
