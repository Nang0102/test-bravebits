/* eslint-disable no-undef */
import Column from "components/column/columnindex";
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
  const cardDragOver = useRef(null);
  const columnIdDragCard = useRef(null);
  const columnIdDropCard = useRef(null);

  //   const [draggedCard, setDraggedCard] = useState(null);

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

  const handleCardDragStart = (e, card, columnIndex, columnId, cardIndex) => {
    // sourceCardId.current = cardId;/////////
    columnIdDragCard.current = columnId;
    console.log("e", e.target);
    console.log("card", card);

    console.log("columnId-Drag", columnId);
    // console.log("cardIndex", cardIndex);
    // console.log("sourceCardId-drag", cardId);
  };
  const handleCardDragOver = () => {};
  const handleCardDragEnd = () => {};

  // const handleCardDragOver = (e, card, cardIndex, columnId) => {
  //   e.preventDefault();
  //   cardDragOver.current = cardIndex;
  //   columnIdDropCard.current = columnId;
  //   //   // targetCardId.current = card._id;

  //   // targetCardId.current = cardId;/////
  //   console.log(" targetColumnId-drag---over", columnId);
  //   // console.log("targetCardId-Drag------over", cardId);
  // };

  // const handleCardDragEnd = (e, card, columnIndex, cardIndex, columnId) => {
  //   // const indexColumnDrop = Number(eleBelow.dataset.indexcolumn);
  //   console.log("drag drop", e);

  //   const tempColumns = cloneDeep(columns);

  //   const targetColumnIndex = tempColumns.findIndex(
  //     (col) => col._id === columnIdDropCard.current
  //   );

  //   // let targetCardIndex;
  //   console.log("targetColumnId------Reff", targetColumnIndex);

  //   console.log("columnINDEX---DROP", columnIndex);
  //   console.log("cardIndex ---DROP", cardDragOver.current);
  //   console.log("card----DROP", card);
  //   if (columnIndex !== targetColumnIndex) {
  //     //   targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
  //     //     (card) => card._id === targetCardId.current
  //     //   );

  //     const A = tempColumns[columnIndex].cards.splice(
  //       tempColumns[columnIndex].cards.indexOf(card),
  //       1
  //     );
  //     console.log("A-----", A[0]);
  //     tempColumns[targetColumnIndex].cards.splice(
  //       cardDragOver.current,
  //       0,
  //       A[0]
  //     );

  //     tempColumns[targetColumnIndex].cardOrder.splice(
  //       cardDragOver.current,
  //       0,
  //       tempColumns[columnIndex].cardOrder.splice(cardIndex, 1)[0]
  //     );
  //     //   tempColumns[columnIndex].cardOrder = tempColumns[columnIndex].cards.map(
  //     //     (card) => card._id
  //     //   );
  //     //   let cardCurrent;
  //     //   if (sourceCardId) {
  //     //     cardCurrent = tempColumns[targetColumnIndex].cards.find(
  //     //       (card) => card._id === sourceCardId.current
  //     //     );
  //     //   }
  //     console.log(
  //       "tempColumns[columnIndex].cardOrder",
  //       tempColumns[columnIndex]
  //     );

  //     console.log("cardCurrent", card);
  //     const newCard = { ...card, columnId: columnIdDropCard.current };
  //     console.log("newCard", newCard);

  //     console.log(
  //       "------tempColumns[targetColumnIndex].cardOrder",
  //       tempColumns[targetColumnIndex]
  //     );
  //     Promise.allSettled([
  //       updateCard(card._id, newCard),
  //       updateColumn(tempColumns[columnIndex]._id, tempColumns[columnIndex]),
  //       updateColumn(
  //         tempColumns[targetColumnIndex]._id,
  //         tempColumns[targetColumnIndex]
  //       ),
  //     ])
  //       .then((results) => {
  //         const hasError = results.some(
  //           (result) => result.status === "rejected"
  //         );
  //         if (hasError) {
  //           setColumns(columns);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setColumns(columns);
  //       });
  //     console.log("tempColumns---End", tempColumns);
  //   }
  //   // else {
  //   //   //   sourceCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
  //   //   //     (card) => card._id === sourceCardId.current
  //   //   //   );

  //   //   //   targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
  //   //   //     (card) => card._id === targetCardId.current
  //   //   //   );
  //   //   targetCardIndex = cardDragOver.current;

  //   //   tempColumns[targetColumnIndex].cardOrder.splice(
  //   //     targetCardIndex,
  //   //     0,
  //   //     tempColumns[targetColumnIndex].cardOrder.splice(sourceCardIndex, 1)[0]
  //   //   );

  //   //   tempColumns[targetColumnIndex].cards.splice(
  //   //     targetCardIndex,
  //   //     0,
  //   //     tempColumns[targetColumnIndex].cards.splice(sourceCardIndex, 1)[0]
  //   //   );

  //   //   updateColumn(
  //   //     tempColumns[targetColumnIndex]._id,
  //   //     tempColumns[targetColumnIndex]
  //   //   ).catch((error) => {
  //   //     setColumns(columns);
  //   //   });
  //   // }

  //   setColumns(tempColumns);
  // };

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
      {columns.map((column, index) => {
        return (
          <Column
            key={index}
            droppable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onUpdateColumnState={handleUpdateColumn}
            column={column}
            columnIndex={index}
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
