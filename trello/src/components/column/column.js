/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
import React, { useState, useRef, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { cloneDeep } from "lodash";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import ConfirmModal from "components/common/confirmModal";
import { modalActionConfirm } from "actions/constant";
import { createNewCard } from "./../../actions/httpRequest";

function Column(props) {
  const { column, onDragStart, onDragOver, onDragEnd, onUpdateColumn } = props;
  const [showPopper, setShowPopper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(mapOrder(column.cards, column.cardOrder, "_id"));
  }, [column]);

  const [columnTitle, setColumnTitle] = useState("");

  const [newCardTitle, setNewCardTitle] = useState("");

  const newCardInput = useRef(null);
  const targetCardId = useRef(null);
  const sourceCardId = useRef(null);

  const handleToggleIcon = () => setShowPopper(!showPopper);
  const handleToggleDelete = () => setShowModal(!showModal);
  const handleToggleForm = () => setOpenForm(!openForm);

  const handleDragStartCard = (e, cardId) => {
    sourceCardId.current = cardId;
  };
  const handleDragOverCard = (e, cardId) => {
    e.preventDefault();
    targetCardId.current = cardId;
  };

  const handleDragEndCard = (e) => {
    const tempCards = cloneDeep(cards);

    const sourceCardIndex = tempCards.findIndex(
      (card) => card._id === sourceCardId.current
    );
    console.log("sourceCardIndex", sourceCardIndex);

    const targetCardIndex = tempCards.findIndex(
      (card) => card._id === targetCardId.current
    );
    console.log("targetCardIndex", targetCardIndex);

    tempCards.splice(
      targetCardIndex,
      0,
      tempCards.splice(sourceCardIndex, 1)[0]
    );
    console.log("tempCards", tempCards);
    setCards(tempCards);
  };

  const handleActionModalConfirm = (type) => {
    if (type === modalActionConfirm) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: "true",
      };
      onUpdateColumn(newColumn);
    }
    handleToggleDelete();
  };

  useEffect(() => {
    setColumnTitle(column.columnName);
  }, [column.columnName]);

  const handleColumnTitleInput = (e) => {
    e.preventDefault();
    setColumnTitle(e.target.value);
  };

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      columnName: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  useEffect(() => {
    if (newCardInput && newCardInput.current) {
      newCardInput.current.focus();
    }
  }, [openForm]);

  const handleCardTitleChange = (e) => {
    e.preventDefault();
    setNewCardTitle(e.target.value);
  };

  const handleClickBtnAdd = () => {
    if (!newCardTitle) {
      newCardInput.current.focus();
      return;
    }

    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      cardName: newCardTitle.trim(),
    };

    createNewCard(newCardToAdd).then((card) => {
      let newColumn = cloneDeep(column);
      newColumn.cards.push(card);
      newColumn.cardOrder.push(card._id);

      onUpdateColumn(newColumn);
      setNewCardTitle("");
      handleToggleForm();
    });
  };

  return (
    <div
      className="columns"
      columnid={column._id}
      draggable
      onDragStart={(e) => onDragStart(e, column._id)}
      onDragOver={(e) => onDragOver(e, column._id)}
      onDragEnd={(e) => onDragEnd(e, column._id)}
    >
      <header>
        <input
          className="column-title"
          placeholder=" Enter title..."
          value={column.columnName}
          onChange={handleColumnTitleInput}
          onBlur={handleColumnTitleBlur}
          onKeyDown={(event) =>
            event.key === "Enter" && handleColumnTitleBlur()
          }
        />

        {!showPopper && (
          <MoreHorizIcon
            className="column-actions"
            onClick={handleToggleIcon}
          />
        )}
        {showPopper && (
          <div className="popper">
            <span className="popper-actions">Actions</span>
            <ClearIcon className="popper-clear" onClick={handleToggleIcon} />
            <button>Edit Column</button>
            <button onClick={handleToggleDelete}>Delete Column</button>
          </div>
        )}
      </header>

      {showModal && (
        <ConfirmModal
          show={showModal}
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
            columnId={column._id}
            onDragStart={handleDragStartCard}
            onDragOver={handleDragOverCard}
            onDragEnd={handleDragEndCard}
          />
        ))}
      </ul>
      {openForm && (
        <form className="enter-new-add">
          <input
            className="input-new-card"
            placeholder=" Enter title card..."
            ref={newCardInput}
            value={newCardTitle}
            onChange={handleCardTitleChange}
            // onKeyDown={(event) => event.key === "Enter" && handleClickBtnAdd}
          />
        </form>
      )}

      <footer>
        {openForm && (
          <div className="confirm">
            <button
              className="button-confirm new-card"
              onClick={handleClickBtnAdd}
            >
              Add
            </button>
            <ClearIcon className="button-clear" onClick={handleToggleForm} />
          </div>
        )}
        {!openForm && (
          <div className="footer-actions" onClick={handleToggleForm}>
            <AddIcon className="icon" />
            Add another card
          </div>
        )}
      </footer>
    </div>
  );
}

export default Column;
