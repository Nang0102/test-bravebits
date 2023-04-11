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
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleSelectAllText = (e) => {
    e.target.focus();
    e.target.select();
  };
  const handleBlur = (e) => {
    if (!e.target.value) {
      setTitleColumn(title);
    }
    handleColumnTitleBlur(titleColumn);
  };

  return (
    <input
      className="column-title-edit"
      placeholder=" Enter title..."
      autofocus
      value={titleColumn}
      ref={titleRef}
      onChange={handleColumnTitleInput}
      onBlur={handleBlur}
      onKeyDown={handleContentEnter}
      onClick={handleSelectAllText}
    />
  );
}

export default EditTitleColumn;
