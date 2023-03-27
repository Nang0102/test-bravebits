import React from "react";
import "./card.scss";

function Card(props) {
  const { card, onDragStart, onDragOver, onDragEnd } = props;

  return (
    <li
      cardId={card.id}
      className="card-item"
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      onDragOver={(e) => onDragOver(e, card.id)}
      onDragEnd={(e) => onDragEnd(e, card.id)}
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.title}
    </li>
  );
}

export default Card;
