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
    // const boardId = "641829eec348c36c1f5e8000";
    const boardId = "642adf8c0ff950e624011157";
    fetchBoardDetail(boardId).then((board) => {
      console.log("board", board);

      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
      // setCards(cards);
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
        console.log(error);
        setColumns(columns);
        setBoard(board);
      }
    );
    // setColumns(tempColumns);
    // setBoard(newBoard);
  };

  const handleCardDragStart = (e, cardId, columnId) => {
    sourceCardId.current = cardId;
    sourceColumnId.current = columnId;

    console.log("dragstart", cardId);
    // console.log("cardId", cardId);
    // console.log("sourceColumnId", sourceColumnId.current);
  };
  const handleCardDragOver = (e, cardId, columnId) => {
    e.preventDefault();
    targetCardId.current = cardId;
    targetColumnId.current = columnId;
    // console.log("over", targetCardId.current, targetColumnId.current);
  };

  const handleCardDragEnd = (e, cardId, columnId) => {
    console.log("drop");
    // const tempColumns = cloneDeep(columns);
    const tempColumns = [...columns];
    // console.log("cardId", cardId);
    // console.log("carcolumnIddId", columnId);
    // console.log("tempColumns", tempColumns);
    const sourceColumnIndex = tempColumns.findIndex(
      (col) => col._id === sourceColumnId.current
    );

    // console.log("sourceColumnIndex", sourceColumnIndex);
    // console.log("targetColumnId", targetColumnId.current);

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
      console.log(
        "tempColumns[targetColumnIndex].cardOrder",
        tempColumns[targetColumnIndex].cardOrder
      );
      console.log("targetCardId", targetCardId.current);
      const cardCurrent = tempColumns[targetColumnIndex].cards.find(
        (card) => card._id === sourceCardId.current
      );
      const newCard = { ...cardCurrent, columnId: targetColumnId.current };
      console.log("newCard", newCard);

      console.log("cardCurrent", cardCurrent);
      updateCard(sourceCardId.current, newCard);

      updateColumn(
        tempColumns[sourceColumnIndex]._id,
        tempColumns[sourceColumnIndex]
      ).catch((error) => {
        console.log("error", error);
        setColumns(columns);
      });

      updateColumn(
        tempColumns[targetColumnIndex]._id,
        tempColumns[targetColumnIndex]
      );

      console.log(
        "tempColumns[targetColumnIndex].cardOrder",
        tempColumns[targetColumnIndex].cardOrder
      );
    } else {
      console.log("Cung cot");
      sourceCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
        (card) => card._id === sourceCardId.current
      );
      console.log("sourceCardIndex", sourceCardIndex);

      targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
        (card) => card._id === targetCardId.current
      );
      console.log("targetCardIndex", targetCardIndex);

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

      console.log(
        " tempColumns[targetColumnIndex].order",
        tempColumns[targetColumnIndex].cardOrder
      );
      updateColumn(
        tempColumns[targetColumnIndex]._id,
        tempColumns[targetColumnIndex]
      ).catch((error) => {
        console.log("error", error);
        setColumns(columns);
      });
    }

    console.log("tempColumns", tempColumns);
    // setCards(tempCards);
    setColumns(tempColumns);
    console.log("end", tempColumns);
    console.log("board222", board);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleClickBtnAdd = () => {
    console.log("Inside handleClickBtnAdd");
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

        console.log("newColumns", newColumns);
        console.log("column", column);
        console.log("board first", board);
        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((column) => column && column._id);
        newBoard.columns = newColumns;
        console.log("newBoard", newBoard);

        setColumns(newColumns);
        setBoard(newBoard);
        setNewTitle("");
        handleToggleForm();
        console.log("newBoard after", newBoard);
      });
    }
  };

  const handleUpdateColumn = (newColumnToUpdate) => {
    console.log("newColumnToUpdate", newColumnToUpdate);
    const columnIdToUpdate = newColumnToUpdate._id;

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
              // onKeyDown={(event) => {
              //   if (event.key === "Enter") {
              //     // console.log("enter");
              //     // handleClickBtnAdd();
              //   }
              // }}
            />
            <div className="confirm">
              <button className="button-confirm" onClick={handleClickBtnAdd}>
                Add Column
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
