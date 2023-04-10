import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
import { updateCard } from "actions/httpRequest";

const Card = (props) => {
  const {
    card,
    cardName,
    onDragStart: onCardDragStart,
    onDragOver: onCardDragOver,
  } = props;
  useEffect(() => {
    setInputChange(cardName);
    setTitleCard(cardName);
  }, [cardName]);
  // const handleOpen = ()=>{}

  const [displayEdit, setDisplayEdit] = useState(false);
  const [titleCard, setTitleCard] = useState("");
  const [inputChange, setInputChange] = useState("");

  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };

  const handleSave = () => {
    if (inputChange.trim() !== "") {
      setTitleCard(inputChange);
      const newCard = {
        ...card,
        cardName: inputChange,
      };
      updateCard(card._id, newCard);
      setDisplayEdit(false);
    } else {
      setTitleCard(cardName);
      setDisplayEdit(false);
    }
  };

  const handleDisplayEdit = (e) => {
    setDisplayEdit(true);
    window.addEventListener("click", (e) => {
      if (
        (e.target.matches(".edit-field") &&
          !e.target.matches(".edit-btn") &&
          !e.target.matches(".edit-icon")) ||
        e.target.matches(".modal-bg")
      ) {
        setDisplayEdit(false);
      }
    });
  };

  return (
    <>
      {/* <CardStyled
        draggable="true"
        onDragStart={(e) => {
          setIsDropCard(true);
          return onCardDragStart(e, card, columnIndex, cardIndex, columnId);
        }}
        onDragEnter={(e) => {
          handleCardOver(e, cardIndex, columnId);
        }}
        onDragEnd={(e) => {
          setIsDropCard(false);
          return handleDragEndCard(e, card, columnIndex, cardIndex);
        }}
        className="card"
        data-indexcolumn={columnIndex}
      >
        {titleCard}
        <div className="edit-btn" onClick={handleDisplayEdit}>
          <i className="fa-solid fa-pencil edit-icon"></i>
        </div>
        {displayEdit && (
          <div className="edit-field">
            <input
              type="text"
              name=""
              id="input-edit"
              value={inputChange}
              autoFocus
              onChange={handleInputChange}
            />
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </CardStyled>
      {displayEdit && <ModalStyled className="modal-bg"></ModalStyled>} */}
      <div className="item">
        <li
          id={card._id}
          cardId={card._id}
          className="card-item"
          columnId={card.columnId}
          draggable
          onDragStart={(e) => {
            e.stopPropagation();
            onCardDragStart(e);
          }}
          onDragOver={(e) => onCardDragOver(e)}
        >
          {card.cover && <img src={card.cover} className="card-cover" alt="" />}
          {/* {card.cardName} */}
          {titleCard}
          <div className="edit-btn" onClick={handleDisplayEdit}>
            <i className="fa-solid fa-pencil edit-icon"></i>
          </div>
          {/* <input className="edit-card" onChange={handleInputChange} /> */}
          {displayEdit && (
            <div className="edit-field">
              <input
                type="text"
                name=""
                id="input-edit"
                value={inputChange}
                autoFocus
                onChange={handleInputChange}
              />
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </li>
        {displayEdit && <div className="modal-bg"></div>}
      </div>
    </>
  );
};

export default Card;
