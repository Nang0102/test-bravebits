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
    const sourceCardId = useRef(null);
    const targetCardId = useRef(null);
    const [draggingOver, setDraggingOver] = useState(false);
  
    const handleClickIcon = () => {
      setShowPopper(true);
    };
  
    const handleDragStartCard = (e, cardId) => {
      sourceCardId.current = cardId;
    };
  
    const handleDragOverCard = (e, cardId) => {
      e.preventDefault();
      targetCardId.current = cardId;
    };
  
    const handleDragEndCard = (e) => {
      const tempCards = [...cards];
      const sourceCardIndex = tempCards.findIndex(
        (card) => card._id === sourceCardId.current
      );
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
  
    const handleDragEnterColumn = (e) => {
      e.preventDefault();
      setDraggingOver(true);
    };
  
    const handleDragLeaveColumn = (e) => {
      e.preventDefault();
      setDraggingOver(false);
    };
  
    const handleDropCard = (e) => {
      e.preventDefault();
      setDraggingOver(false);
  
      const tempCards = [...cards];
      const sourceCardIndex = tempCards.findIndex(
        (card) => card._id === sourceCardId.current
      );
      const targetColumnId = e.currentTarget.getAttribute("columnid");
      const targetColumnIndex = columns.findIndex(
        (column) => column._id === targetColumnId
      );
      const targetCardIndex = tempCards.findIndex(
        (card) => card._id === targetCardId.current
      );
  
      if (column._id === targetColumnId) {
        tempCards.splice(
          targetCardIndex,
          0,
          tempCards.splice(sourceCardIndex, 1)[0]
        );
      } else {
        const sourceCard = tempCards[sourceCardIndex];
        tempCards.splice(sourceCardIndex, 1);
        const newCard = {
          ...sourceCard,
          columnId: targetColumnId,
        };
        columns[targetColumnIndex].cards.push(newCard);
        columns[targetColumnIndex].cardOrder.push(newCard._id);
      }
  
      setCards(tempCards);
    };
  
    return (
      <div
        className={`columns ${draggingOver ? "dragging-over" : ""}`}
        columnid={column._id}
        draggable
        onDragStart={(e) => onDragStart(e, column._id)}
        onDragOver={(e) => onDragOver(e, column._id)}
        onDragEnd={(e) => onDragEnd(e, column._id)}
        onDrop={handleDropCard}
>
      <header>
        <div className="column-title">{column.title}</div>
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
