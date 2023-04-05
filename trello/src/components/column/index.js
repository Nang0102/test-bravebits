// ColumnHeader.js
import React, { useState, useRef, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClearIcon from "@mui/icons-material/Clear";
import {
  handleContentAfterEnter,
  handleSelectAllText,
} from "actions/contentEdit";

function ColumnHeader(props) {
  const {
    column,
    titleColumn,
    handleColumnTitleInput,
    handleColumnTitleBlur,
    handleToggleIcon,
    showPopper,
    handleToggleDelete,
  } = props;
  console.log("titleColumn", titleColumn);

  // useEffect(() => {
  //   setTitleColumn(titleColumn);
  // }, [titleColumn]);
  return (
    <header
    // draggable
    // onDragStart={(e) => {
    //   onDragStart(e, column._id);
    // }}
    // onDragOver={(e) => onDragOver(e, column._id)}
    // onDragEnd={(e) => {
    //   return onDragEnd(e, column._id);
    // }}
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
          onClickIcon={handleToggleIcon}
        />
      )}
      {showPopper && (
        <div className="popper">
          <span className="popper-actions">Actions</span>
          <ClearIcon className="popper-clear" onClickIcon={handleToggleIcon} />
          <button>Edit Column</button>
          <button onClick={handleToggleDelete}>Delete Column</button>
        </div>
      )}
    </header>
  );
}

export default ColumnHeader;
