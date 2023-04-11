import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
import { updateCard } from "actions/httpRequest";

const Card = (props) => {
  const {
    card,
    cardName,
    onDragStart: onCardDragStart,
    onDragOver: onCardDragOver,
  } = props;

  const [inputChange, setInputChange] = useState("");
  const [title, setTitle] = useState(cardName);
  const handleChange = (e) => {
    setInputChange(e.target.value);
  };

  const handleCardTitle = () => {
    if (title.trim() !== "") {
      setTitle(inputChange);
      const newCard = { ...card, cardName: inputChange };
      updateCard(newCard);
    } else {
      setTitle(title);
    }
  };

  return (
    <>
      <div className="item">
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
          <input
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={handleCardTitle}
          />
        </li>
      </div>
    </>
  );
};

export default Card;
