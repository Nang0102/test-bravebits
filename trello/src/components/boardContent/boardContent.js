/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect } from "react";
import "./boardContent.scss";
import "actions/initialData";
import { InitialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";

function BoardContent(props) {
  const targetColumnId = props.columnId;
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = InitialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);
  if (Object.keys(board).length === 0) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found!
      </div>
    );
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("dragOver");
  };

  // const handleDrop = (e,targetCard) => {
  //   // console.log('drop');
  //   let sourceColumnId = e.dataTransfer.getData("columnId");
  //   console.log("drop", sourceColumnId);

  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   console.log("target", e.target);
  //   const sourceColumnId = e.dataTransfer.getData("columnId");
  //   const sourceCardId = e.dataTransfer.getData("cardId");

  //   const targetCardId = e.target.getAttribute("cardId");
  //   console.log("targetCardId", targetCardId);

  //   const tempColumns = [...columns];
  //   console.log("tempColumns", tempColumns);
  //   const sourceColumnIndex = tempColumns.findIndex(
  //     (column) => column.id === sourceColumnId
  //   );
  //   console.log("sourceColumnIndex", sourceColumnIndex);
  //   const targetColumnIndex = tempColumns.findIndex(
  //     (column) => column.id === targetColumnId
  //   );
  //   console.log("targetColumnIndex", targetColumnIndex);
  //   // const sourceCards1 = [...tempColumns[sourceColumnIndex]];

  //   // console.log("sourceCards1", sourceCards1);

  //   // const sourceCards = [...tempColumns[sourceColumnIndex].cards];
  //   // const targetCards = [...tempColumns[targetColumnIndex].cards];
  //   const sourceCards = [...tempColumns[sourceColumnIndex].cards];
  //   console.log("sourceCards1", sourceCards);
  //   const targetCards = tempColumns[targetColumnIndex].cards;

  //   const sourceCardIndex = sourceCards.findIndex(
  //     (card) => card.id === sourceCardId
  //   );
  //   const targetCardIndex = targetCards.findIndex(
  //     (card) => card.id === targetCardId
  //   );

  //   const draggingCard = sourceCards[sourceCardIndex];

  //   // Remove the dragging card from the source column
  //   sourceCards.splice(sourceCardIndex, 1);

  //   // Insert the dragging card into the target column
  //   targetCards.splice(targetCardIndex, 0, draggingCard);

  //   // Update the source and target columns
  //   tempColumns[sourceColumnIndex].cards = sourceCards;
  //   tempColumns[targetColumnIndex].cards = targetCards;

  //   setColumns(tempColumns);
  // };
  const handleDrop = (e, id) => {
    e.preventDefault();

    const sourceColumnId = e.dataTransfer.getData("columnId");
    const sourceCardId = e.dataTransfer.getData("cardId");

    console.log("sourceColumnId", sourceColumnId);
    console.log("sourceCardId", sourceCardId);

    const targetCardId = e.target.getAttribute("id"); // note: attribute name should be lowercase
    // console.log("e.target", e.target.tagName);
    // console.log("e.target id", e.target.getAttribute("id"));
    // console.log("e.target.parentElement", e.target.parentElement);
    console.log("targetCardId", targetCardId);

    // find source and target columns and their index
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === sourceColumnId
    );
    const targetColumnIndex = columns.findIndex((column) =>
      column.cards.some((card) => card.id === targetCardId)
    );
    console.log("sourceColumnIndex", sourceColumnIndex);
    console.log("targetColumnIndex", targetColumnIndex);

    const sourceColumn = columns[sourceColumnIndex];
    const targetColumn = columns[targetColumnIndex];

    // const sourceColumn = columns[0];
    // const targetColumn = columns[1];

    if (sourceCardId) {
      //
      // find source and target cards
      const sourceCardIndex = sourceColumn.cards.findIndex(
        (card) => card.id === sourceCardId
      );
      const sourceCard = sourceColumn.cards[sourceCardIndex];
      const targetCardIndex = targetColumn.cards.findIndex(
        (card) => card.id === targetCardId
      );
      const targetCard = targetColumn.cards[targetCardIndex];

      // swap the source and target cards
      // sourceColumn.cards.splice(sourceCardIndex, 0, targetCard);
      targetColumn.cards.splice(sourceCardIndex, 0, sourceCard);
    }

    // update the columns state with the new card positions
    const newColumns = [...columns];
    // newColumns.splice(sourceColumnIndex, 1, sourceColumn);
    newColumns.splice(sourceColumnIndex, 0, targetColumn);
    setColumns(newColumns);
  };

  return (
    <div
      className="board-contents"
      droppable="true"
      onDragOver={(e) => {
        handleDragOver(e);
      }}
      onDrop={(e) => {
        handleDrop(e);
      }}
    >
      {columns.map((column, id) => {
        return (
          // <div>
          <Column key={id} column={column} />
          // </div>
        );
      })}
    </div>
  );
}

export default BoardContent;
