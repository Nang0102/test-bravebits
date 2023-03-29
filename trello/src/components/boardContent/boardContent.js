/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import "./boardContent.scss";
import { mapOrder } from "utilities/sorts";
import { fetchBoardDetail, createNewColumn } from "actions/httpRequest";
const _ = require("lodash");

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newTitle, setNewTilte] = useState("");

  const sourceColumnId = useRef(null);
  const targetColumnId = useRef(null);
  const newControlInput = useRef(null);

  useEffect(() => {
    const boardId = "641829eec348c36c1f5e8000";
    fetchBoardDetail(boardId).then((board) => {
      console.log("board", board[0]);
      setBoard(board);
      setColumns(mapOrder(board[0].columns, board[0].columnOrder, "_id"));
    });
  }, []);

  useEffect(() => {
    if (newControlInput && newControlInput.current) {
      newControlInput.current.focus();
    }
  }, [openForm]);

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
    // const tempColumns = [...columns];
    const tempColumns = _.cloneDeep(columns);
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

  const handleTonggleForm = () => setOpenForm(!openForm);

  const handleTitleChange = (e) => {
    setNewTilte(e.target.value);
  };

  const handleClickBtnAdd = () => {
    if (!newTitle) {
      newControlInput.current.focus();
      return;
    }
    const newColumn = {
      // _id: Math.random(),
      boardId: board[0]._id,
      columnName: newTitle.trim(),
    };

    createNewColumn(newColumn).then((column) => {
      console.log("column", column);
      const newColumns = [...columns];
      newColumns.push(column);
      console.log("newColumns", newColumns);

      let newBoard = { ...board[0] };
      newBoard.columnOrder = newColumns.map((column) => column._id);
      newBoard.colums = newColumns;
      setColumns(newColumns);
      setBoard(newBoard);
      setNewTilte("");
      handleTonggleForm();
    });
  };

  const handleUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id;
    console.log("columnIdToUpdate", columnIdToUpdate);

    const newColumns = [...columns];
    console.log("newColumns", newColumns);

    const columnIndexToUpdate = newColumns.findIndex(
      (column) => column._id === columnIdToUpdate
    );
    console.log("columnIndexToUpdate", columnIndexToUpdate);
    if (newColumnToUpdate._destroy) {
      //remove column
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      //update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }
    let newBoard = { ...board[0] };
    newBoard.columnOrder = newColumns.map((column) => column._id);
    newBoard.colums = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
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
            onUpdateColumn={handleUpdateColumn}
            column={column}
          />
        );
      })}
      <div className="add-new" onClick={handleTonggleForm}>
        {!openForm && (
          <div className="add-new-column">
            <AddIcon className="icon" />
            Add another column
          </div>
        )}

        {openForm && (
          <form className="enter-new-column">
            <input
              className="input-new-column"
              // placeholder=" Enter title..."
              ref={newControlInput}
              value={newTitle}
              onChange={handleTitleChange}
              onKeyDown={(event) =>
                event.key === "Enter" && handleClickBtnAdd()
              }
            />
            <div className="confirm">
              <button className="button-confirm" onClick={handleClickBtnAdd}>
                Add
              </button>
              <ClearIcon className="button-clear" onClick={handleTonggleForm} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BoardContent;
