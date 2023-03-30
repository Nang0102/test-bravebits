/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import "./boardContent.scss";
import "../../App.scss";
import { mapOrder } from "utilities/sorts";
import { fetchBoardDetail, createNewColumn } from "actions/httpRequest";
const _ = require("lodash");

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const sourceColumnId = useRef(null);
  const targetColumnId = useRef(null);
  const newColumnInput = useRef(null);

  const [openForm, setOpenForm] = useState(false);
  const handleToggleForm = () => setOpenForm(!openForm);

  useEffect(() => {
    const boardId = "641829eec348c36c1f5e8000";
    fetchBoardDetail(boardId).then((board) => {
      setBoard(board);
      setColumns(mapOrder(board[0].columns, board[0].columnOrder, "_id"));
    });
  }, []);

  useEffect(() => {
    if (newColumnInput && newColumnInput.current) {
      newColumnInput.current.focus();
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
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    targetColumnId.current = columnId;
  };

  const handleDragEnd = (e) => {
    // const tempColumns = [...columns];
    const tempColumns = _.cloneDeep(columns);
    const sourceColumnIndex = tempColumns.findIndex(
      (column) => column._id === sourceColumnId.current
    );
    const targetColumnIndex = tempColumns.findIndex(
      (column) => column._id === targetColumnId.current
    );
    tempColumns.splice(
      targetColumnIndex,
      0,
      tempColumns.splice(sourceColumnIndex, 1)[0]
    );
    setColumns(tempColumns);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleClickBtnAdd = () => {
    if (!newTitle) {
      newColumnInput.current.focus();
      return;
    }
    const newColumn = {
      boardId: board[0]._id,
      columnName: newTitle.trim(),
      cardOrder: [],
      cards: [],
    };

    createNewColumn(newColumn).then((column) => {
      const newColumns = [...columns];
      newColumns.push(column);

      let newBoard = { ...board[0] };
      newBoard.columnOrder = newColumns.map((column) => column._id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);
      setNewTitle("");
      handleToggleForm();
    });
  };

  const handleUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id;

    let newColumns = [...columns];

    const columnIndexToUpdate = newColumns.findIndex(
      (column) => column._id === columnIdToUpdate
    );
    if (newColumnToUpdate._destroy) {
      //remove column
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      //update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }
    let newBoard = { ...board[0] };
    newBoard.columnOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;
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
            onUpdateColumnState={handleUpdateColumn}
            // onAddNewCardToColumn={onAddNewCardToColumn}
            column={column}
          />
        );
      })}
      <div className="add-new" onClick={handleToggleForm}>
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
              placeholder=" Enter title column..."
              ref={newColumnInput}
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
              <ClearIcon className="button-clear" onClick={handleToggleForm} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BoardContent;
