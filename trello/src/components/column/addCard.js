import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import BtnAdd from "../board-content/BtnAdd";

function AddCard(props) {
  const { handleCardClickBtnAdd, newCardInputRef } = props;
  const [openFormCard, setOpenFormCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleToggleFormCard = () => setOpenFormCard(!openFormCard);
  const handleCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };
  const handleCardAdd = () => {
    const newTitle = newCardInputRef.current.value;
    handleCardClickBtnAdd(newTitle);
    setNewCardTitle("");
  };
  return (
    <div>
      {openFormCard ? (
        <div className="enter-new-add">
          <input
            className="input-new-card"
            placeholder=" Enter title card..."
            ref={newCardInputRef}
            value={newCardTitle}
            onChange={handleCardTitleChange}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     handleCardClickBtnAdd();
            //   }
            // }}
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
        </div>
      ) : (
        <BtnAdd handleToggleFormCard={handleToggleFormCard} />
      )}
    </div>
  );
}

export default AddCard;
