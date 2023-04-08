import React, { useEffect, useState } from "react";
import "./column.scss";

function EditTitleColumn(props) {
  const { title, handleColumnTitleBlur, titleRef } = props;
  const [titleColumn, setTitleColumn] = useState("");

  useEffect(() => {
    setTitleColumn(title);
  }, [title]);

  const handleColumnTitleInput = (e) => {
    setTitleColumn(e.target.value);
  };

  const handleContentEnter = (e) => {
    console.log("target", e.target);

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
      className="column-title"
      placeholder=" Enter title..."
      value={titleColumn}
      ref={titleRef}
      onChange={handleColumnTitleInput}
      onBlur={() => handleColumnTitleBlur(titleColumn)}
      onKeyDown={handleContentEnter}
      onClick={handleSelectAllText}
    />
  );
}

export default EditTitleColumn;
