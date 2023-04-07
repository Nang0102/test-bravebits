/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { cloneDeep } from "lodash";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import ConfirmModal from "components/common/confirmModal";
import { modalActionConfirm } from "actions/constant";
import { createNewCard, deleteColumn, updateTitle } from "actions/httpRequest";

import EditTilteColumn from "./EditTileColumn";
import AddCard from "./AddCard";

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
  const titleRef = useRef();
  const newCardInput = useRef(null);
  const [showPopper, setShowPopper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(mapOrder(column.cards, column.cardOrder, "_id"));
  }, [column]);

  const [title, setTitle] = useState("");
  // const [newCardTitle, setNewCardTitle] = useState("");

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
    if (newTitle === "") {
    } else if (newTitle === column.title) {
      return;
    } else {
      const newColumn = {
        ...column,
        columnName: newTitle,
      };
      if (column.columnName !== newTitle) {
        updateTitle(newColumn._id, newColumn);
      }
    }
  };
  useEffect(() => {
    if (newCardInput && newCardInput.current) {
      newCardInput.current.focus();
    }
  }, [openForm]);

  const handleCardClickBtnAdd = (newCardTitle) => {
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
        newColumn.cards.push(card);
        newColumn.cardOrder.push(card._id);
        onUpdateColumnState(newColumn);
        // setNewCardTitle("");
        handleToggleForm();
      });
    }
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
        <EditTilteColumn
          title={title}
          handleColumnTitleBlur={handleColumnTitleBlur}
          titleRef={titleRef}
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
            columnId={column._id}
            onDragStart={onCardDragStart}
            onDragOver={onCardDragOver}
          />
        ))}
      </ul>

      {/* {openForm && (

      )} */}
      <AddCard
        newCardInput={newCardInput}
        handleaddCard={handleCardClickBtnAdd}
      />
      {/* {openForm && (
        <div className="enter-new-add">
          <input
            className="input-new-card"
            placeholder=" Enter title card..."
            ref={newCardInput}
            value={newCardTitle}
            onChange={handleCardTitleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCardClickBtnAdd();
              }
            }}
          />
          <div className="confirm">
            <button
              className="button-confirm new-card"
              onClick={handleCardClickBtnAdd}
            >
              Add Card
            </button>
            <ClearIcon className="button-clear" onClick={handleToggleForm} />
          </div>
        </div>
      )} */}

      <footer data-columnid={column._id}>
        {/* {openForm && 
        {/* <div className="confirm">
            <button
              className="button-confirm new-card"
              onClick={handleCardClickBtnAdd}
            >
              Add Card
            </button>
            <ClearIcon className="button-clear" onClick={handleToggleForm} />
          </div>
        </div> 
        )} */}
        {!openForm && (
          <div
            className="footer-actions"
            onClick={handleToggleForm}
            data-columnid={column._id}
          >
            <AddIcon className="icon" />
            Add another card
          </div>
        )}
      </footer>
    </div>
  );
}

export default Column;
