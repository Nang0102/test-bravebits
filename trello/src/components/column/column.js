import Card from "components/cards/card";
import React from "react";
import "./column.scss";
import { mapOrder } from "utilities/sorts";
// import {handleDragStart, handleDragEnter, handleDragOver, handleDragEnd, handleDrop} from 'components/drag&drop/drag&drop'

function Column(props) {
  const { column } = props;

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("columnId", id);
    console.log("idstart", id);
  };

  const cards = mapOrder(column.cards, column.cardOrder, "id");
  return (
    <div
      className="columns"
      draggable
      onDragStart={(e) => handleDragStart(e, column.id)}
    >
      <header> {column.title}</header>
      <ul className="card-list">
        {cards.map((card, id) => (
          <Card
            key={id}
            card={card}
            onDrop={props.onDrop}
            columnId={column.id}
          />
        ))}
      </ul>
      <footer> Add another card</footer>
    </div>
  );
}

export default Column;
