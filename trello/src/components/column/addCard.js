import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import BtnAddCard from "./BtnAddCard";

function AddCard(props) {
  const { handleCardClickBtnAdd, newCardInput } = props;
  const [openFormCard, setOpenFormCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleToggleFormCard = () => setOpenFormCard(!openFormCard);
  const handleCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };
  const handleCardAdd = (e) => {
    e.preventDefault();

    const newTitle = newCardInput.current.value;
    if (newTitle === "") {
      console.log("newTitle222----", newTitle);
      return;
    }

    handleCardClickBtnAdd(newTitle);
    setOpenFormCard(false);
    setNewCardTitle("");
  };
  return (
    <div className="new-card">
      {openFormCard ? (
        <form className="enter-new-add">
          <input
            className="input-new-card"
            placeholder=" Enter title card..."
            autoFocus
            ref={newCardInput}
            value={newCardTitle}
            onChange={handleCardTitleChange}
          />
          <div className="confirm">
            <button className="button-confirm new-card" onClick={handleCardAdd}>
              Add Card
            </button>
            <ClearIcon
              className="button-clear"
              onClick={handleToggleFormCard}
            />
          </div>
        </form>
      ) : (
        <BtnAddCard handleToggleFormCard={handleToggleFormCard} />
      )}
    </div>
  );
}

export default AddCard;
