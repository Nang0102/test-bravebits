import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import BtnAdd from "./BtnAdd";

function AddColumn(props) {
  const { handleClickBtnAdd, newColumnInput } = props;
  const [openForm, setOpenForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleToggleForm = () => setOpenForm(!openForm);
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const newColumnTitle = newColumnInput.current.value;
    console.log("newColumnTitle", newColumnTitle);

    if (newColumnTitle === "") {
      console.log("newColumnTitle222", newColumnTitle);
      return;
    }

    handleClickBtnAdd(newColumnTitle);
    setOpenForm(false);
    setNewTitle("");
  };
  return (
    <div>
      {openForm ? (
        <form className="enter-new-column">
          <input
            className="input-new-column"
            placeholder=" Enter title column..."
            autoFocus
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
