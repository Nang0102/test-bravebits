/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClearIcon from "@mui/icons-material/Clear";
import { cloneDeep } from "lodash";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import ConfirmModal from "components/common/confirmModal";
import { modalActionConfirm } from "actions/constant";
import { createNewCard, deleteColumn } from "actions/httpRequest";
import { updateColumn } from "actions/httpRequest";
import {
  handleContentAfterEnter,
  handleSelectAllText,
} from "actions/contentEdit"; ////////////

function Column(props) {
  const {
    column,
    onDragStart,
    onDragOver,
    onDragEnd,
    onUpdateColumnState,
    onCardDragStart,
    onCardDragOver,
    onCardDragEnd,
    onDrop,
  } = props;
  const [showPopper, setShowPopper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(mapOrder(column.cards, column.cardOrder, "_id"));
  }, [column]);

  const [titleColumn, setTitleColumn] = useState(""); //////

  const [newCardTitle, setNewCardTitle] = useState("");

  const newCardInput = useRef(null);

  const handleToggleIcon = () => setShowPopper(!showPopper);
  const handleToggleDelete = () => {
    setShowPopper(false);
    setShowModal(!showModal);
  };
  const handleToggleForm = () => setOpenForm(!openForm);

  useEffect(() => {
    setTitleColumn(column.columnName);
  }, [column.columnName]);

  ////////////
  const handleColumnTitleInput = (e) => {
    setTitleColumn(e.target.value);
  };

  const handleActionModalConfirm = (type) => {
    if (type === modalActionConfirm) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true,
      };
      //delete colum
      deleteColumn(newColumn._id, newColumn).then((updatedColumn) => {
        console.log("updatedColumn", updatedColumn);
        onUpdateColumnState(updatedColumn);
      });
      // onUpdateColumnState(newColumn);
    }
    handleToggleDelete();
  };

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      // _destroy: false,
      columnName: titleColumn,
    };

    if (column.columnName !== titleColumn) {
      updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        console.log("newColumn change", newColumn);
        console.log("updatedColumn", updatedColumn);
        onUpdateColumnState(updatedColumn);
      });
    }
  };

  useEffect(() => {
    if (newCardInput && newCardInput.current) {
      newCardInput.current.focus();
    }
  }, [openForm]);

  const handleCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleCardClickBtnAdd = () => {
    if (!newCardTitle) {
      newCardInput.current.focus();
      return;
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
        console.log(card);
        console.log("newColumn", newColumn);
        newColumn.cards.push(card);
        newColumn.cardOrder.push(card._id);
        onUpdateColumnState(newColumn);
        setNewCardTitle("");
        handleToggleForm();
      });
    }
  };

  return (
    <div className="columns" columnid={column._id}>
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
        <input
          className="column-title"
          placeholder=" Enter title..."
          value={titleColumn}
          onChange={handleColumnTitleInput}
          onBlur={handleColumnTitleBlur}
          onKeyDown={handleContentAfterEnter}
          onClick={handleSelectAllText}
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
        {/* {mapOrder(column.cards, column.cardOrder, "_id").map((card, id) => ( */}
        {cards.map((card, id) => (
          <Card
            key={id}
            card={card}
            columnId={column._id}
            onDragStart={onCardDragStart}
            onDragOver={onCardDragOver}
            // onDragEnd={onCardDragEnd}
            onDrop={onDrop}
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
            onKeyDown={(event) =>
              event.key === "Enter" && handleCardClickBtnAdd()
            }
          />
        </form>
      )}

      <footer>
        {openForm && (
          <div className="confirm">
            <button
              className="button-confirm new-card"
              onClick={handleCardClickBtnAdd}
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
