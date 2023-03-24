// import { useState } from "react";
import Column from "components/column/column";
import React, { useState, useEffect } from "react";
import "./boardContent.scss";
import "actions/initialData";
import { InitialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";
// import Column from "./Column";

// function Board({ columns }) {
function Board() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  console.log(columns);
  const handleDragStart = (e, item) => {
    console.log('e.target', e.target);
    console.log(item);
    setDraggedItem(item);
  };

  const handleDragEnter = (e, targetItem) => {
    if (draggedItem === null) {
      return;
    }
    if (targetItem.type === "column") {
      // logic xử lý khi kéo cột
      const newColumns = [...columns];
      console.log('newColumns', newColumns);
      const draggedColumn = newColumns.find((col) => col.id === draggedItem.id);
      console.log(draggedColumn);
      const targetColumn = newColumns.find((col) => col.id === targetItem.id);
      const draggedIndex = draggedColumn.index;
      const targetIndex = targetColumn.index;
      draggedColumn.index = targetIndex;
      targetColumn.index = draggedIndex;
      newColumns.sort((a, b) => a.index - b.index);
      setDraggedItem({ ...draggedItem, index: targetIndex });
      return;
    } else {
      // logic xử lý khi kéo thẻ
      const newColumns = [...columns];
      const draggedColumn = newColumns.find((col) =>
        col.items.some((item) => item.id === draggedItem.id)
      );
      const targetColumn = newColumns.find((col) =>
        col.items.some((item) => item.id === targetItem.id)
      );
      const draggedItems = draggedColumn.items;
      const targetItems = targetColumn.items;
      const draggedIndex = draggedItems.findIndex((item) => item.id === draggedItem.id);
      const targetIndex = targetItems.findIndex((item) => item.id === targetItem.id);
      const draggedItemCopy = { ...draggedItem };
      draggedItems.splice(draggedIndex, 1);
      targetItems.splice(targetIndex, 0, draggedItemCopy);
      setDraggedItem({ ...draggedItem, columnId: targetColumn.id, index: targetIndex });
      return;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    if (targetItem.type === "column") {
      // logic xử lý khi thả cột
      const newColumns = [...columns];
      const draggedColumn = newColumns.find((col) => col.id === draggedItem.id);
      const targetColumn = newColumns.find((col) => col.id === targetItem.id);
      draggedColumn.index = targetColumn.index;
      newColumns.sort((a, b) => a.index - b.index);
      setDraggedItem(null);
      return;
    } else {
      // logic xử lý khi thả thẻ
      const newColumns = [...columns];
      const draggedColumn = newColumns.find((col) =>
        col.items.some((item) => item.id === draggedItem.id)
      );
      const targetColumn = newColumns.find((col) => col.id === draggedItem.columnId);
      const targetItems = targetColumn.items;
      const draggedItems = draggedColumn.items.filter((item) => item.id !== draggedItem.id);
      const targetIndex = targetItems.findIndex((item) => item.id === targetItem.id);
      draggedItem.columnId = targetColumn.id;
      targetItems.splice(targetIndex, 0, draggedItem);
      targetColumn.items = targetItems;
      draggedColumn.items = draggedItems;
      setDraggedItem(null);
      return;
      }
      };

      useEffect(() => {
        const boardFromDB = InitialData.boards.find(
          (board) => board.id === "board-1"
        );
        if (boardFromDB) {
          setBoard(boardFromDB);
          let resultColumns = mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id")
          setColumns(resultColumns);
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
      <div
      className="board-contents"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, { type: "board" })}
      >
      {columns.map((column, index) => {
      return (
      <div
      key={column.id}
      onDragEnter={(e) => handleDragEnter(e, { type: "column", id: column.id })}
      onDrop={(e) => handleDrop(e, { type: "column", id: column.id })}
      >
      <Column
      column={column}
      onDragStart={e =>handleDragStart(e)}
      isDragging={draggedItem && draggedItem.id === column.id && draggedItem.type === "column"}
      />
      </div>
      );
      })}
      </div>
      );
      }
      
      export default Board;
