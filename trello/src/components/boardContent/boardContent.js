/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import "./boardContent.scss";
import "../../App.scss";
import { mapOrder } from "utilities/sorts";
import {
  updateBoard,
  fetchBoardDetail,
  createNewColumn,
  updateColumn,
  updateCard,
} from "actions/httpRequest";
import { cloneDeep } from "lodash";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const sourceColumnId = useRef(null);
  const targetColumnId = useRef(null);
  const newColumnInput = useRef(null);

  const sourceCardId = useRef(null);
  const targetCardId = useRef(null);
  // const columnIdDropCard = useRef(null)

  const [openForm, setOpenForm] = useState(false);
  const handleToggleForm = () => setOpenForm(!openForm);

  useEffect(() => {
    const boardId = "642adf8c0ff950e624011157";
    fetchBoardDetail(boardId).then((board) => {
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
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
    const tempColumns = cloneDeep(columns);
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
    let newBoard = cloneDeep(board);
    newBoard.columnOrder = tempColumns.map((col) => col._id);
    newBoard.columns = tempColumns;
    setColumns(tempColumns);
    setBoard(newBoard);
    updateBoard(newBoard._id, { columnOrder: newBoard.columnOrder }).catch(
      (error) => {
        setColumns(columns);
        setBoard(board);
      }
    );
  };

  const handleCardDragStart = (e, cardId, columnId) => {
    sourceCardId.current = cardId;
    sourceColumnId.current = columnId;
    console.log("columnId-Drag", columnId);
    console.log("sourceCardId-drag", cardId);
  };
  const handleCardDragOver = (e, cardId, columnId) => {
    e.preventDefault();
    targetCardId.current = cardId;
    targetColumnId.current = columnId;
    console.log(" targetColumnId-drag---over", columnId);
    console.log("targetCardId-Drag------over", cardId);
  };

  const handleCardDragEnd = (e, cardId, columnId) => {
    console.log("drag drop", e);
    const tempColumns = cloneDeep(columns);
    // const tempColumns = [...columns];
    const sourceColumnIndex = tempColumns.findIndex(
      (col) => col._id === sourceColumnId.current
    );

    const targetColumnIndex = tempColumns.findIndex(
      (col) => col._id === targetColumnId.current
    );

    let sourceCardIndex;
    let targetCardIndex;
    console.log("targetColumnId------Reff", targetColumnId.current);
    if (sourceColumnIndex !== -1 && sourceColumnIndex !== targetColumnIndex) {
      sourceCardIndex = tempColumns[sourceColumnIndex].cards.findIndex(
        (card) => card._id === sourceCardId.current
      );

      targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
        (card) => card._id === targetCardId.current
      );

      tempColumns[targetColumnIndex].cardOrder.splice(
        targetCardIndex,
        0,
        tempColumns[sourceColumnIndex].cardOrder.splice(sourceCardIndex, 1)[0]
      );

      console.log(
        " --------------targetColumnId-dragEnd",
        targetColumnId.current
      );
      console.log("targetCardId-DragEnd", cardId);

      tempColumns[targetColumnIndex].cards.splice(
        targetCardIndex,
        0,
        tempColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1)[0]
      );
      let cardCurrent;
      if (sourceCardId) {
        cardCurrent = tempColumns[targetColumnIndex].cards.find(
          (card) => card._id === sourceCardId.current
        );
      }

      console.log("cardCurrent", cardCurrent);
      const newCard = { ...cardCurrent, columnId: targetColumnId.current };
      console.log("newCard", newCard);
      updateCard(sourceCardId.current, newCard);

      updateColumn(
        tempColumns[sourceColumnIndex]._id,
        tempColumns[sourceColumnIndex]
      ).catch((error) => {
        setColumns(columns);
      });

      updateColumn(
        tempColumns[targetColumnIndex]._id,
        tempColumns[targetColumnIndex]
      );
    } else {
      sourceCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
        (card) => card._id === sourceCardId.current
      );

      targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
        (card) => card._id === targetCardId.current
      );

      tempColumns[targetColumnIndex].cardOrder.splice(
        targetCardIndex,
        0,
        tempColumns[targetColumnIndex].cardOrder.splice(sourceCardIndex, 1)[0]
      );

      tempColumns[targetColumnIndex].cards.splice(
        targetCardIndex,
        0,
        tempColumns[targetColumnIndex].cards.splice(sourceCardIndex, 1)[0]
      );

      updateColumn(
        tempColumns[targetColumnIndex]._id,
        tempColumns[targetColumnIndex]
      ).catch((error) => {
        setColumns(columns);
      });
    }

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
    if (board._id) {
      const newColumn = {
        boardId: board._id,
        columnName: newTitle.trim(),
        cardOrder: [],
        cards: [],
      };

      createNewColumn(newColumn).then((column) => {
        let newColumns = [...columns];
        newColumns.push(column);

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((column) => column && column._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
        setNewTitle("");
        handleToggleForm();
      });
    }
  };

  const handleUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id;
    console.log("newColumnToUpdate", newColumnToUpdate);

    let newColumns = cloneDeep(columns);

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
    let newBoard = cloneDeep(board);
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
            column={column}
            onCardDragStart={handleCardDragStart}
            onCardDragOver={handleCardDragOver}
            onDrop={handleCardDragEnd}
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
              // onKeyDown={(event) => {
              //   if (event.key === "Enter") {
              //     // handleClickBtnAdd();
              //   }
              // }}
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
