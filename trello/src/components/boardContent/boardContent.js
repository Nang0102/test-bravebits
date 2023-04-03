/* eslint-disable no-undef */
import Column from "components/column/column";
import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import "./boardContent.scss";
import "../../App.scss";
import { mapOrder } from "utilities/sorts";
import { fetchBoardDetail, createNewColumn } from "actions/httpRequest";
import { cloneDeep } from "lodash";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
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
    const boardId = "641829eec348c36c1f5e8000";
    fetchBoardDetail(boardId).then((board) => {
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
      setCards(cards);
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
    setColumns(tempColumns);
  };

  const handleCardDragStart = (e, cardId, columnId) => {
    e.dataTransfer.setData("cardId", cardId);
    sourceCardId.current = cardId;
    sourceColumnId.current = columnId;

    console.log("cardId", cardId);
    console.log("sourceColumnId", sourceColumnId.current);
  };
  const handleCardDragOver = (e, cardId, columnId) => {
    console.log("cardOver");
    e.preventDefault();
    targetCardId.current = cardId;
    targetColumnId.current = columnId;
  };

  const handleCardDragEnd = (e, columnId) => {
    const tempColumns = cloneDeep(columns);
    const cardId = e.dataTransfer.getData("cardId");
    console.log("cardId", cardId);
    console.log("tempColumns", tempColumns);
    const sourceColumnIndex = tempColumns.findIndex(
      (col) => col._id === sourceColumnId.current
    );

    console.log("sourceColumnIndex", sourceColumnIndex);
    console.log("targetColumnId", targetColumnId.current);

    const targetColumnIndex = tempColumns.findIndex(
      (col) => col._id === targetColumnId.current
    );
    console.log("targetColumnIndex", targetColumnIndex);

    let sourceCardIndex;
    let targetCardIndex;

    if (sourceColumnIndex !== -1 && sourceColumnIndex !== targetColumnIndex) {
      console.log("Khac cot");
      sourceCardIndex = tempColumns[sourceColumnIndex].cards.findIndex(
        (card) => card._id === sourceCardId.current
      );
      console.log("sourceCardIndex-column", sourceCardIndex);

      targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
        (card) => card._id === targetCardId.current
      );
      console.log("targetCardIndex-column", targetCardIndex);

      tempColumns[targetColumnIndex].cardOrder.splice(
        targetCardIndex,
        0,
        tempColumns[sourceColumnIndex].cardOrder.splice(sourceCardIndex, 1)[0]
      );

      console.log(
        "tempColumns[sourceColumnIndex].cardOrder",
        tempColumns[sourceColumnIndex].cardOrder
      );

      tempColumns[targetColumnIndex].cards.splice(
        targetCardIndex,
        0,
        tempColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1)[0]
      );
    } else {
      console.log("Cung cot");
      sourceCardIndex = tempColumns[sourceColumnIndex].cards.findIndex(
        (card) => card._id === sourceCardId.current
      );
      console.log("sourceCardIndex", sourceCardIndex);

      targetCardIndex = tempColumns[sourceColumnIndex].cards.findIndex(
        (card) => card._id === targetCardId.current
      );
      console.log("targetCardIndex", targetCardIndex);

      tempColumns[sourceColumnIndex].cardOrder.splice(
        targetCardIndex,
        0,
        tempColumns[sourceColumnIndex].cardOrder.splice(sourceCardIndex, 1)[0]
      );

      tempColumns[sourceColumnIndex].cards.splice(
        targetCardIndex,
        0,
        tempColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1)[0]
      );
    }
    console.log(
      " tempColumns[sourceColumnIndex].cards",
      tempColumns[sourceColumnIndex].cards
    );

    console.log("tempColumns", tempColumns);
    // setCards(tempCards);
    setColumns(tempColumns);
    // console.log("tempCards", tempCards);
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
        let newColumns = [];
        if (columns) {
          newColumns = [...columns];
        }
        if (column._id) {
          newColumns.push(column);
        }

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
    console.log("newColumnToUpdate", newColumnToUpdate);
    const columnIdToUpdate = newColumnToUpdate._id;

    // let newColumns = [...columns];
    let newColumns = cloneDeep(columns);

    const columnIndexToUpdate = newColumns.findIndex(
      (column) => column._id === columnIdToUpdate
    );
    console.log("columnIndexToUpdate", columnIndexToUpdate);
    console.log("newColumnToUpdate._destroy", newColumnToUpdate._destroy);
    if (newColumnToUpdate._destroy) {
      //remove column
      console.log("new column delete", newColumns);
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      //update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);

      console.log("new column Board", newColumns);
    }
    let newBoard = { ...board };
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
            allcards={cards}
            onCardDragStart={handleCardDragStart}
            onCardDragOver={handleCardDragOver}
            // onCardDragEnd={handleCardDragEnd}
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
