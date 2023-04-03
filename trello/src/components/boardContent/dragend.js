// const handleCardDragEnd = (e) => {
//     const tempCards = cloneDeep(cards);
//     const tempColumns = cloneDeep(columns);
//     const cardId = e.dataTransfer.getData("cardId");
//     console.log("cardId", cardId);

//     console.log("tempColumns", tempColumns);
//     console.log("tempCards", tempCards);
//     const sourceColumnIndex = tempColumns.findIndex(
//       (col) => col._id === sourceColumnId.current
//     );
//     console.log("sourceColumnIndex", sourceColumnIndex);
//     const targetColumnIndex = tempColumns.findIndex(
//       (col) => col._id === targetColumnId.current
//     );
//     console.log("targetColumnIndex", targetColumnIndex);

//     let sourceCardIndex;
//     let targetCardIndex;

//     if (sourceColumnIndex !== targetColumnIndex) {
//       console.log("Khac cot");
//       sourceCardIndex = tempColumns[sourceColumnIndex].cards.findIndex(
//         (card) => card._id === sourceCardId.current
//       );
//       console.log("sourceCardIndex-column", sourceCardIndex);

//       targetCardIndex = tempColumns[targetColumnIndex].cards.findIndex(
//         (card) => card._id === targetCardId.current
//       );
//       console.log("targetCardIndex-column", targetCardIndex);

//       tempColumns[targetColumnIndex].cards.splice(
//         targetCardIndex,
//         0,
//         tempColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1)[0]
//       );
//     } else {
//       console.log("Cung cot");

//       sourceCardIndex = tempCards.findIndex((card) => {
//         // card._id === sourceCardId.current;
//         console.log("check card", card);
//       });
//       console.log("sourceCardIndex", sourceCardIndex);

//       targetCardIndex = tempCards.findIndex(
//         (card) => card._id === targetCardId.current
//       );
//       tempCards.splice(
//         targetCardIndex,
//         0,
//         tempCards.splice(sourceCardIndex, 1)[0]
//       );
//     }
