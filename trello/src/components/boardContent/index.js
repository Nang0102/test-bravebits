import Column from "components/column/column";
import React, { useState, useEffect } from "react";
import "./boardContent.scss";
import { InitialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const [isDragging, setIsDragging] = useState();
  console.log(columns);

  useEffect(() => {
    const boardFromDB = InitialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  const handleDragStart = (e, columnId) => {
    console.log("drag");
    // e.dataTransfer.setData("columnId", columnId);
    setIsDragging(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    const sourceColumnId = e.dataTransfer.getData("columnId");
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === sourceColumnId
    );
    const targetColumnIndex = columns.findIndex(
      (column) => column.id === targetColumnId
    );

    if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
      const newColumns = [...columns];
      const [removedColumn] = newColumns.splice(sourceColumnIndex, 1);
      newColumns.splice(targetColumnIndex, 0, removedColumn);

      const newColumnOrder = newColumns.map((column) => column.id);
      setColumns(newColumns);

      setBoard((prevBoard) => ({
        ...prevBoard,
        columnOrder: newColumnOrder,
      }));
    }
  };

  if (Object.keys(board).length === 0) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found!
      </div>
    );
  }

  return (
    <div className="board-contents">
      {columns.map((column, index) => (
        <div
          key={column.id}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <Column
            column={column}
            onDragStart={(e) => handleDragStart(e, column.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default BoardContent;
