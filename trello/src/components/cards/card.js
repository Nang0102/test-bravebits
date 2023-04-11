import React, { useState, useEffect, useRef } from "react";
import "./card.scss";
import ClearIcon from "@mui/icons-material/Clear";
import ConfirmModal from "components/common/ConfirmModal";
import { modalActionConfirm } from "actions/constant";

import EditTitleCard from "./EditTitleCard";
import { updateCardTitle, deleteCard } from "actions/httpRequest";
function Card(props) {
  const {
    card,
    cardName,
    onUpdateCardState,
    onDragStart: onCardDragStart,
    onDragOver: onCardDragOver,
  } = props;

  const [inputCard, setInputCard] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInputCard(cardName);
  }, [cardName]);
  const handleResetCardTitle = () => {
    setInputCard(cardName);
  };

  const handleToggleIcon = () => setShowModal(!showModal);

  const handleCardTitle = (newCardTitle) => {
    setIsOpen(false);
    if (newCardTitle === "") {
      handleResetCardTitle();
    } else {
      const newCard = {
        ...card,
        cardName: newCardTitle,
      };
      if (card.cardName !== newCardTitle) {
        updateCardTitle(newCard._id, newCard)
          .then((res) => setInputCard(res.cardName))
          .catch((err) => console.log(err));
      }
    }
  };
  const handleActionModalConfirm = (type) => {
    if (type === modalActionConfirm) {
      const newCard = {
        ...card,
        _destroy: true,
      };

      deleteCard(newCard._id, newCard).then((updatedCard) => {
        onUpdateCardState(updatedCard);
      });
    }
    handleToggleIcon();
  };
  return (
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
        {isOpen ? (
          <EditTitleCard
            cardName={card.cardName}
            inputCard={inputCard}
            handleCardTitle={handleCardTitle}
          />
        ) : (
          <div className="card-title" onClick={() => setIsOpen(!isOpen)}>
            {inputCard}
          </div>
        )}

        <ClearIcon className="card-actions" onClick={handleToggleIcon} />
        <ConfirmModal
          show={showModal}
          onBlur={handleCardTitle}
          onAction={handleActionModalConfirm}
          title=" Remove column"
          content={`Are you sure to remove ${card.cardName}?`}
        />
      </li>
    </div>
  );
}

export default Card;
