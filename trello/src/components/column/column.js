/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import Popper from "./popper";
function Column(props) {
  const { column, onDragStart, onDragOver, onDragEnd } = props;
  const [showPoper, setShowPoper] = useState(false);

  const handleClickIcon = () => {
    setShowPoper(true);
  };
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  console.log("card", cards);

  return (
    <div
      className="columns"
      draggable
      columnid={column.id}
      onDragStart={(e) => onDragStart(e, column.id)}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDragEnd={(e) => onDragEnd(e, column.id)}
    >
      <header>
        <div className="column-title">{column.title}</div>
        <MoreHorizIcon className="column-actions" onClick={handleClickIcon} />
        {showPoper && <Popper />}
      </header>

      <ul className="card-list">
        {cards.map((card, id) => (
          <Card
            key={id}
            card={card}
            columnId={column.id}
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
