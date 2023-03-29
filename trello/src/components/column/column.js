/* eslint-disable react-hooks/rules-of-hooks */
import Card from "components/cards/card";
import React, { useState, useRef, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import "./column.scss";
import { mapOrder } from "utilities/sorts";
import ConfirmModal from "components/common/confirmModal";
import { modalActionClose, modalActionConfirm } from "actions/constant";

function Column(props) {
  const {
    column,
    columns,
    onDragStart,
    onDragOver,
    onDragEnd,
    onUpdateColumn,
  } = props;
  const [showPopper, setShowPopper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState(
    mapOrder(column.cards, column.cardOrder, "_id")
  );
  const [columnTitle, setColumnTitle] = useState("");
  const targetCardId = useRef(null);
  const sourceCardId = useRef(null);

  const handleToggleIcon = () => {
    setShowPopper(!showPopper);
  };

  const handleDragStartCard = (e, cardId) => {
    sourceCardId.current = cardId;
  };
  const handleDragOverCard = (e, cardId) => {
    e.preventDefault();
    targetCardId.current = cardId;
    // console.log("targetCard", targetCardId);
  };

  // console.log("ttttt", targetCardId);
  const handleDragEndCard = (e) => {
    const tempCards = [...cards];
    const sourceCardIndex = tempCards.findIndex(
      (card) => card._id === sourceCardId.current
    );
    // console.log("sourceCardIndex", sourceCardIndex);
    const targetCardIndex = tempCards.findIndex(
      (card) => card._id === targetCardId.current
    );

    tempCards.splice(
      targetCardIndex,
      0,
      tempCards.splice(sourceCardIndex, 1)[0]
    );
    setCards(tempCards);
  };

  const handleToggleDelete = () => setShowModal(!showModal);

  const handleActionModalConfirm = (type) => {
    if (type === modalActionConfirm) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: "true",
      };
      onUpdateColumn(newColumn);
    }
    console.log(type);
    handleToggleDelete();
  };

  useEffect(() => {
    setColumnTitle(column.columnName);
  }, [column.columnName]);
  const handleColumnTitleInput = (e) => {
    e.preventDefault();
    console.log("title", e.target.value);
    setColumnTitle(e.target.value);
  };
  const handleColumnTitleBlur = () => {
    console.log(column.columnName);
    const newColumn = {
      ...column,
      columnName: columnTitle,
    };
    onUpdateColumn(newColumn);
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
      <form className="enter-new-add">
        <input
          className="input-new-add-card"
          // placeholder=" Enter title..."
          // ref={newControlInput}

          // value={newTitle}
          // onChange={handleTitleChange}
          // onKeyDown={(event) =>
          //   event.key === "Enter" && handleClickBtnAdd()
          // }
        />
        <div className="confirm">
          <button className="button-confirm">
            {/* onClick={handleClickBtnAdd} */}
            Add
          </button>
          <ClearIcon className="button-clear" />
          {/* onClick={handleTonggleForm}  */}
        </div>
      </form>

      <footer>
        <div className="footer-actions">
          <AddIcon className="icon" />
          Add another card
        </div>
      </footer>
    </div>
  );
}

export default Column;
