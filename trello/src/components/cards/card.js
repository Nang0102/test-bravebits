import React from "react";
import "./card.scss";

function Card(props) {
  const { card } = props;


  return (
    <li
      cardId={card.id}
      className="card-item"
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" />}
      {card.title}
    </li>
  );
}

export default Card;
