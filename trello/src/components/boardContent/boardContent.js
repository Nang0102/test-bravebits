/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
import "./boardContent.scss";
import "actions/initialData";
import { InitialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";

function BoardContent(props) {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const [sourceColumnId, setSourceColumnId] = useState(null)
  const [targetColumnId, setTargetColumnId] = useState(null)

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

  const handleDragStart = (e, columnId) => {
    setSourceColumnId(columnId)

  }

  const handleDragEnd = (e) => {
    // console.log("hello", sourceColumnId, targetColumnId)
    const  tempColumns = [...columns];
    const sourceColumnIndex = tempColumns.findIndex(
      (column) => column.id === sourceColumnId
    );
    const targetColumnIndex = tempColumns.findIndex((column)=> column.id === targetColumnId)

    // tempColumns.splice(sourceColumnIndex,0,targetColumnIndex)
    // console.log("target",tempColumns.splice(sourceColumnIndex, 1)[0]);
    tempColumns.splice(targetColumnIndex, 0, tempColumns.splice(sourceColumnIndex, 1)[0]);
    setColumns(tempColumns)


  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    // console.log("dragOver");
    // console.log(columnId)
    setTargetColumnId(columnId)
  };


  return (
    <div className="board-contents">
      {columns.map((column, id) => {
        return (
            <Column
            key={id}
            droppable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
             column={column} />
        );
      })}
    </div>
  );
}

export default BoardContent;
