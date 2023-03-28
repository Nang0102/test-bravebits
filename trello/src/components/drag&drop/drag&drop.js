/* eslint-disable react-hooks/rules-of-hooks */
// import  {useState, useRef} from "react";


// const [draggedItem, setDraggedItem] = useState();

// // export const handleDragStart = (e, card) => {
// //     e.dataTransfer.setData("card", JSON.stringify(card));
// //   };

// // const dragItem = useRef();
// // const dragOverItem = useRef();
//  export const handleDragStart = (e, targetItem) => {
//     setDraggedItem(targetItem);
//   };
  
//   export const handleDragEnter = (e, targetItem) => {
//     if (draggedItem === null) {
//       return;
//     }
//     if (targetItem.type === "column") {
//       // logic xử lý khi kéo cột
//     } else {
//       // logic xử lý khi kéo thẻ
//     }
//   };
  
//   export const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };
  
//   export const handleDrop = (e, targetItem) => {
//     e.preventDefault();
//     if (targetItem.type === "column") {
//         // logic xử lý khi thả cột
//       } else {
//         // logic xử lý khi thả thẻ
//       }
    
    
//     // Xử lý việc di chuyển thẻ giữa các cột
//   };
  
//   export const handleDragEnd = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const element = e.target.closest(".droppable");
  
//     if (!element) {
//       return;
//     }
  
//     element.style.backgroundColor = "";
//   };
  
export const handleDragStart = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
  };
  
  export const handleDragEnter = (e) => {
    console.log("e.target", e.target);
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  };
  
  export const handleDragOver = (e) => {
    console.log('handleDragOver');
    e.preventDefault();
  };
  
  export const handleDrop = (e, columnId, setColumns) => {
    const card = JSON.parse(e.dataTransfer.getData("card"));
    setColumns((columns) => {
      const newColumns = [...columns];
      console.log("newColumn", newColumns);
      const columnIdx = newColumns.findIndex((col) => col._id === columnId);
      console.log("columnIdx", columnIdx);

      newColumns[columnIdx].cards = [...newColumns[columnIdx].cards, card];
      return newColumns;
    });
  };
  
  export const handleDragEnd = (e) => {
    e.currentTarget.style.backgroundColor = "";
  };
  