/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
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
import AddColumn from "./AddColumn";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const sourceColumnId = useRef(null);
  const targetColumnId = useRef(null);
  const newColumnInput = useRef(null);

  const sourceCardId = useRef(null);
  const targetCardId = useRef(null);
  const sourceColumnIdDragCard = useRef(null);
  const targetColumnIdDropCard = useRef(null);

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

  const handleCardDragStart = (e) => {
    sourceCardId.current = e.target.id;
    const dropZone = e.target.closest(".columns");
    sourceColumnIdDragCard.current = dropZone.dataset.columnid;
  };
  const handleCardDragOver = (e) => {
    e.preventDefault();
  };

  const handleCardDrop = (e) => {
    const dropZone = e.target.closest(".columns");
    targetColumnIdDropCard.current = dropZone.dataset.columnid;
    targetCardId.current = e.target.id;

    const tempColumns = cloneDeep(columns);

    const sourceColumnIndex = tempColumns.findIndex(
      (col) => col._id === sourceColumnIdDragCard.current
    );
    const targetColumnIndex = tempColumns.findIndex(
      (col) => col._id === targetColumnIdDropCard.current
    );

    let sourceCardIndex;
    let targetCardIndex;
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
      const newCard = {
        ...cardCurrent,
        columnId: targetColumnIdDropCard.current,
      };

      Promise.allSettled([
        updateCard(sourceCardId.current, newCard),
        updateColumn(
          tempColumns[sourceColumnIndex]._id,
          tempColumns[sourceColumnIndex]
        ),
        updateColumn(
          tempColumns[targetColumnIndex]._id,
          tempColumns[targetColumnIndex]
        ),
      ])
        .then((results) => {
          const hasError = results.some(
            (result) => result.status === "rejected"
          );
          if (hasError) {
            setColumns(columns);
          }
        })
        .catch((error) => {
          console.log(error);
          setColumns(columns);
        });
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
    sourceCardId.current = null;
    targetCardId.current = null;
    sourceColumnIdDragCard.current = null;
    targetColumnIdDropCard.current = null;
  };

  const handleInputNewColumnTitle = (e) => {
    setNewColumnTitle(e.target.value);
  };

  const handleClickBtnAdd = (newTitle) => {
    console.log("newTitle", newTitle);
    if (newTitle === "") {
      return;
    }
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
      console.log("newTitle3333", newTitle);

      createNewColumn(newColumn).then((column) => {
        console.log("Add a new column: ", column);
        let newColumns = [...columns];
        if (!column.cards) {
          column.cards = [];
        }
        if (!column.cardOrder) {
          column.cardOrder = [];
        }
        newColumns.push(column);

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((column) => column && column._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
        handleToggleForm();
        newColumnInput.current.focus();
      });
    }
  };

  const handleUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id;

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
            onDrop={handleCardDrop}
          />
        );
      })}
      <div className="add-new" onClick={handleToggleForm}>
        <AddColumn
          newColumnInput={newColumnInput}
          newColumnTitle={newColumnTitle}
          onChange={handleInputNewColumnTitle}
          handleClickBtnAdd={handleClickBtnAdd}
        />
      </div>
    </div>
  );
}

export default BoardContent;
