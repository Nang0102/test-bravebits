import React, { useState, useRef, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClearIcon from "@mui/icons-material/Clear";
import {
  handleContentAfterEnter,
  handleSelectAllText,
} from "actions/contentEdit";

import "./column.scss";

function Header(props) {
  const [titleColumn, setTitleColumn] = useState("");

  const [showPopper, setShowPopper] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleIcon = () => setShowPopper(!showPopper);
  const handleToggleDelete = () => {
    setShowPopper(false);
    setShowModal(!showModal);
  };
  //   const handleToggleForm = () => setOpenForm(!openForm);

  //   useEffect(() => {
  //     setTitleColumn(column.columnName);
  //   }, [column.columnName]);

  const handleColumnTitleInput = (e) => {
    setTitleColumn(e.target.value);
  };

  return (
    <div>
      <input
        className="column-title"
        placeholder=" Enter title..."
        value={titleColumn}
        onChange={handleColumnTitleInput}
        //   onBlur={handleColumnTitleBlur}
        onKeyDown={handleContentAfterEnter}
        onClick={handleSelectAllText}
      />
      {!showPopper && (
        <MoreHorizIcon className="column-actions" onClick={handleToggleIcon} />
      )}
      {showPopper && (
        <div className="popper">
          <span className="popper-actions">Actions</span>
          <ClearIcon className="popper-clear" onClick={handleToggleIcon} />
          <button>Edit Column</button>
          <button onClick={handleToggleDelete}>Delete Column</button>
        </div>
      )}
      {/* <header
        draggable
        onDragStart={(e) => {
          onDragStart(e, column._id);
        }}
        onDragOver={(e) => onDragOver(e, column._id)}
        onDragEnd={(e) => {
          return onDragEnd(e, column._id);
        }}
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
      </header> */}
    </div>
  );
}

export default Header;
