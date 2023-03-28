/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
import React, { useState, useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import Popper from "./popper";

function Column(props) {
  const { column, columns, onDragStart, onDragOver, onDragEnd } = props;
  const [showPopper, setShowPopper] = useState(false);
  const [cards, setCards] = useState(
    mapOrder(column.cards, column.cardOrder, "_id")
  );
  const targetCardId = useRef(null);
  const sourceCardId = useRef(null);

  const handleClickIcon = () => {
    setShowPopper(true);
  };

  const handleDragStartCard = (e, cardId) => {
    sourceCardId.current = cardId;
  };
  const handleDragOverCard = (e, cardId) => {
    e.preventDefault();
    targetCardId.current = cardId;
    // console.log("targetCard", targetCardId);
  };

  // console.log("ttttt", targetCardId);
  const handleDragEndCard = (e) => {
    const tempCards = [...cards];
    const sourceCardIndex = tempCards.findIndex(
      (card) => card._id === sourceCardId.current
    );
    // console.log("sourceCardIndex", sourceCardIndex);
    const targetCardIndex = tempCards.findIndex(
      (card) => card._id === targetCardId.current
    );

    tempCards.splice(
      targetCardIndex,
      0,
      tempCards.splice(sourceCardIndex, 1)[0]
    );
    setCards(tempCards);
  };

  return (
    <div
      className="columns"
      columnid={column._id}
      draggable
      onDragStart={(e) => onDragStart(e, column._id)}
      onDragOver={(e) => onDragOver(e, column._id)}
      onDragEnd={(e) => onDragEnd(e, column._id)}
    >
      <header>
        <div className="column-title">{column.columnName}</div>
        <MoreHorizIcon className="column-actions" onClick={handleClickIcon} />
        {showPopper && <Popper />}
      </header>

      <ul className="card-list">
        {cards.map((card, id) => (
          <Card
            key={id}
            card={card}
            columnId={column._id}
            onDragStart={handleDragStartCard}
            onDragOver={handleDragOverCard}
            onDragEnd={handleDragEndCard}
          />
        ))}
      </ul>

      <footer>
        <div className="footer-actions">
          <AddIcon className="icon" />
          Add another card
        </div>
      </footer>
    </div>
  );
}

export default Column;
