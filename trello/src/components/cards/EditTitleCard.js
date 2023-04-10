import React, { useState, useEffect, useRef } from "react";

function EditTitleCard(props) {
  const { inputCard, handleCardTitle, cardTitleRef } = props;
  const [cardTitle, setCardTitle] = useState("");
  useEffect(() => {
    setCardTitle(inputCard);
  }, [inputCard]);
  const handleCardTitleInput = (e) => {
    setCardTitle(e.target.value);
  };

  const handleContentEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleSelectAllText = (e) => {
    e.target.focus();
    e.target.select();
  };
  return (
    <input
      className="card-title"
      placeholder=" Enter title..."
      value={cardTitle}
      ref={cardTitleRef}
      onChange={handleCardTitleInput}
      onBlur={() => handleCardTitle(cardTitle)}
      onKeyDown={handleContentEnter}
      onClick={handleSelectAllText}
    />
  );
}

export default EditTitleCard;
