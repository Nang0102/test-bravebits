import React, { useState, useEffect } from "react";

function EditTitleCard(props) {
  const { cardName, inputCard, handleCardTitle } = props;
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    setCardTitle(inputCard);
  }, [inputCard]);

  const handleCardTitleInput = (e) => {
    setCardTitle(e.target.value);
  };

  const handleContentEnter = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      handleCardTitle(cardTitle);
    }
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setCardTitle(cardName);
    }
    handleCardTitle(cardTitle);
  };

  const handleSelectAllText = (e) => {
    e.target.focus();
    e.target.select();
  };

  return (
    <textarea
      autoFocus
      className="card-title"
      placeholder="Enter card title...."
      value={cardTitle}
      onChange={handleCardTitleInput}
      onBlur={handleBlur}
      onKeyDown={handleContentEnter}
      onClick={handleSelectAllText}
    />
  );
}

export default EditTitleCard;
