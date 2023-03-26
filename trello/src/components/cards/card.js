import React from "react";
import "./card.scss";

function Card(props) {
  const { card } = props;

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("cardId", id);
    console.log("dragStart", id);
  };

  return (
    <li
      id={card.id}
      className="card-item"
      draggable
      onDragStart={(e) => handleDragStart(e, card.id)}
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.title}
    </li>
  );
}

export default Card;
