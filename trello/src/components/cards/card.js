import React from "react";
import "./card.scss";

function Card(props) {
  const { card, onDragStart, onDragOver, onDragEnd } = props;

  return (
    <li
      cardId={card._id}
      className="card-item"
      draggable
      onDragStart={(e) => onDragStart(e, card._id)}
      onDragOver={(e) => onDragOver(e, card._id)}
      onDragEnd={(e) => onDragEnd(e, card._id)}
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.cardName}
    </li>
  );
}

export default Card;
