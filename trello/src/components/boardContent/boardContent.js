import Column from "components/column/column";
import React, { useState, useEffect } from "react";
import "./boardContent.scss";
import "actions/initialData";
import { InitialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";
import {
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDragEnd,
  handleDrop,
} from "components/drag&drop/drag&drop";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  // const { column, setColumns } = props;
  // const { id, title, cards } = column;

  // const [draggedItem, setDraggedItem] = useState(null);

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
  return (
    <div className="board-contents">
      {columns.map((column, id) => {
        return (
          // <div>
          <Column
            key={id}
            column={column}
            setColumns={setColumns}
            draggable
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setColumns)}
          />
          // </div>
        );
      })}
    </div>
  );
}

export default BoardContent;
