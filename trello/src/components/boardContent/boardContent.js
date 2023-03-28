/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import "./boardContent.scss";
import { mapOrder } from "utilities/sorts";
import { fetchBoardDetail } from "actions/httpRequest";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const sourceColumnId = useRef(null);
  const targetColumnId = useRef(null);

  useEffect(() => {
    const boardId = "641829eec348c36c1f5e8000";
    fetchBoardDetail(boardId).then((board) => {
      console.log("board", board[0]);
      setBoard(board);
      setColumns(mapOrder(board[0].columns, board[0].columnOrder, "_id"));
    });
  }, []);
  if (Object.keys(board).length === 0) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found!
      </div>
    );
  }

  const handleDragStart = (e, columnId) => {
    sourceColumnId.current = columnId;
    console.log("targetColumn", e.target);
    console.log("sourceColumnId", sourceColumnId);
  };

  const handleDragOver = (e, columnId) => {
    console.log("overColumn");
    e.preventDefault();
    targetColumnId.current = columnId;
  };

  const handleDragEnd = (e) => {
    // console.log("hello", sourceColumnId, targetColumnId)
    const tempColumns = [...columns];
    const sourceColumnIndex = tempColumns.findIndex(
      (column) => column._id === sourceColumnId.current
    );
    const targetColumnIndex = tempColumns.findIndex(
      (column) => column._id === targetColumnId.current
    );
    console.log("targetColumnIndex", targetColumnIndex);
    tempColumns.splice(
      targetColumnIndex,
      0,
      tempColumns.splice(sourceColumnIndex, 1)[0]
    );
    setColumns(tempColumns);
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
            column={column}
          />
        );
      })}
      <div className="add-new">
        <div className="add-new-column">
          <AddIcon className="icon" />
          Add another column
        </div>
        <form className="enter-new-column">
          <input className="input-new-column" placeholder=" Enter title..." />
          <div className="confirm">
            <button className="button-confirm">Add</button>
            <ClearIcon className="button-clear" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardContent;
