import React, { useState, useEffect, useRef } from "react";

function EditTitleCard(props) {
  const { khanh, inputCard, handleCardTitle, cardTitleRef } = props;
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    setCardTitle(inputCard);
  }, [inputCard]);

  const handleCardTitleInput = (e) => {
    setCardTitle(e.target.value);
  };

  const handleContentEnter = (e) => {
    if (e.keyCode === 13 || e.key === "enter") {
      handleCardTitle(cardTitle);
    }
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setCardTitle(khanh);
    }
    handleCardTitle(cardTitle);
  };

  const handleSelectAllText = (e) => {
    e.target.focus();
    e.target.select();
  };

  return (
    <input
      className="card-title"
      placeholder="moi nhap"
      value={cardTitle}
      ref={cardTitleRef}
      onChange={handleCardTitleInput}
      onBlur={handleBlur}
      onKeyDown={handleContentEnter}
      onClick={handleSelectAllText}
    />
  );
}

export default EditTitleCard;
