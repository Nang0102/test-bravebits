import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import BtnAdd from "./BtnAdd";

function AddColumn(props) {
  const { handleClickBtnAdd, newColumnInput, newColumnTitle } = props;
  const [openForm, setOpenForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleToggleForm = () => setOpenForm(!openForm);
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleAdd = () => {
    const newColumnTitle = newColumnInput.current.value;
    handleClickBtnAdd(newColumnTitle);
    setNewTitle("");
  };
  return (
    <div>
      {openForm ? (
        <form className="enter-new-column">
          <input
            className="input-new-column"
            placeholder=" Enter title column..."
            ref={newColumnInput}
            value={newTitle}
            onChange={handleTitleChange}
          />
          <div className="confirm">
            <button className="button-confirm" onClick={handleAdd}>
              Add
            </button>
            <ClearIcon className="button-clear" onClick={handleToggleForm} />
          </div>
        </form>
      ) : (
        <BtnAdd handleToggleForm={handleToggleForm} />
      )}
    </div>
  );
}

export default AddColumn;
