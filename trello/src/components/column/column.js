/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
// import Card from "components/cards/CardIndex";
import React, { useState, useRef, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { cloneDeep } from "lodash";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import ConfirmModal from "components/common/ConfirmModal";
import { modalActionConfirm } from "actions/constant";
import { createNewCard, deleteColumn, updateTitle } from "actions/httpRequest";

import EditTitleColumn from "./EditTitleColumn";
import AddCard from "./AddCard.js";

function Column(props) {
  const {
    column,
    onDragStart,
    onDragOver,
    onDragEnd,
    onUpdateColumnState,
    onCardDragStart,
    onCardDragOver,
    onDrop,
  } = props;
  const titleRef = useRef(null);
  const newCardInput = useRef(null);
  const [showPopper, setShowPopper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newCardTitleAdd, setNewCardTitleAdd] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(mapOrder(column.cards, column.cardOrder, "_id"));
  }, [column]);

  const [title, setTitle] = useState("");

  const handleToggleIcon = () => setShowPopper(!showPopper);
  const handleToggleDelete = () => {
    setShowPopper(false);
    setShowModal(!showModal);
  };
  const handleToggleForm = () => {
    console.log("open");
    setOpenForm(!openForm);
  };

  useEffect(() => {
    setTitle(column.columnName);
  }, [column.columnName]);

  const handleActionModalConfirm = (type) => {
    if (type === modalActionConfirm) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      deleteColumn(newColumn._id, newColumn).then((updatedColumn) => {
        onUpdateColumnState(updatedColumn);
      });
    }
    handleToggleDelete();
  };

  const handleColumnTitleBlur = (newTitle) => {
    setIsOpen(false);
    if (newTitle === "") {
      setTitle(title);
    } else {
      const newColumn = {
        ...column,
        columnName: newTitle,
      };
      if (column.columnName !== newTitle) {
        updateTitle(newColumn._id, newColumn)
          .then((res) => {
            console.log("res", res);
            setTitle(res.columnName);
          })
          .catch((error) => console.log(error));
      }
    }
  };
  useEffect(() => {
    if (newCardInput && newCardInput.current) {
      newCardInput.current.focus();
    }
  }, [openForm]);

  const handleInputNewCard = (e) => {
    setNewCardTitleAdd(e.target.value);
  };

  const handleCardClickBtnAdd = (newCardTitle) => {
    if (!newCardTitle) {
      newCardInput.current.focus();
    }
    if (column) {
      const newCardToAdd = {
        boardId: column.boardId,
        columnId: column._id,
        cardName: newCardTitle.trim(),
        cover: null,
      };
      createNewCard(newCardToAdd).then((card) => {
        let newColumn = cloneDeep(column);
        newColumn.cards.push(card);
        newColumn.cardOrder.push(card._id);
        onUpdateColumnState(newColumn);
        handleToggleForm();
      });
      newCardInput.current.focus();
    }
  };
  const handleUpdateCard = (newCardUpdate) => {
    const cardIdUpdate = newCardUpdate._id;
    let newCards = [...cards];

    const cardIndexUpdate = newCards.findIndex(
      (card) => card._id === cardIdUpdate
    );
    if (newCardUpdate._destroy) {
      newCards.splice(cardIndexUpdate, 1);
    }
    setCards(newCards);
  };

  return (
    <div
      className="columns"
      data-columnid={column._id}
      onDrop={(e) => {
        onDrop(e);
      }}
    >
      <header
        draggable
        onDragStart={(e) => {
          onDragStart(e, column._id);
        }}
        onDragOver={(e) => onDragOver(e, column._id)}
        onDragEnd={(e) => {
          return onDragEnd(e, column._id);
        }}
      >
        {isOpen ? (
          <EditTitleColumn
            title={title}
            handleColumnTitleBlur={handleColumnTitleBlur}
            titleRef={titleRef}
          />
        ) : (
          <div className="column-title" onClick={() => setIsOpen(!isOpen)}>
            {title}
          </div>
        )}

        {!showPopper && (
          <MoreHorizIcon
            className="column-actions"
            onClick={handleToggleIcon}
          />
        )}
        {showPopper && (
          <div className="popper">
            <span className="popper-actions">Actions</span>
            <ClearIcon
              className="popper-clear"
              onClick={handleToggleIcon}
              onBlur={handleToggleIcon}
            />
            <button onClick={handleToggleDelete}>Delete Column</button>
          </div>
        )}
      </header>

      {showModal && (
        <ConfirmModal
          show={showModal}
          onBlur={handleColumnTitleBlur}
          onAction={handleActionModalConfirm}
          title=" Remove column"
          content={`Are you sure to remove ${column.columnName}?`}
        />
      )}
      <ul className="card-list">
        {cards.map((card, id) => (
          <Card
            key={id}
            card={card}
            cardName={card.cardName}
            columnId={column._id}
            onUpdateCardState={handleUpdateCard}
            onDragStart={onCardDragStart}
            onDragOver={onCardDragOver}
          />
        ))}
      </ul>
      <AddCard
        newCardInput={newCardInput}
        newTitleCard={newCardTitleAdd}
        handleCardClickBtnAdd={handleCardClickBtnAdd}
        onChange={handleInputNewCard}
      />
    </div>
  );
}

export default Column;
