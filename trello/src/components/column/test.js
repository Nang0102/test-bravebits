import React, { useState } from "react";
import styled from "styled-components";
import AddToggleCol from "./AddToggleCol";

const AddFieldStyled = styled.div`
  width: 272px;
  background: #ebecf0;
  padding: 4px;
  border-radius: 3px;

  .input-editable {
    padding: 8px 12px;
    width: 100%;
    border-radius: 3px;
    border: 2.5px solid transparent;
  }

  .input-editable:focus {
    border: 2.5px solid #0079bf;
    outline: none;
  }

  .feature {
    display: flex;
    align-items: center;
  }

  .add-btn {
    padding: 8px 12px;
    background: #0079bf;
    outline: none;
    color: #f2f7fb;
    border: none;
    border-radius: 3px;
    margin-top: 5px;
    font-size: 14px;
  }

  .add-btn:hover {
    background: #026aa7;
    cursor: pointer;
  }

  .close-btn {
    margin-left: 10px;
    font-size: 20px;
    color: #42526e;
  }

  .close-btn:hover {
    cursor: pointer;
    color: #000;
  }
`;

const AddField = ({ newTitle, onChange, handleAddColumn, addTitleRef }) => {
  const [openAddField, setOpenAddField] = useState(false);
  const [inputAddColumn, setInputAddColumn] = useState("");

  const handleInputChange = (e) => {
    setInputAddColumn(e.target.value);
  };

  // Đóng mở add Column
  const handleToggleAddColumn = () => setOpenAddField(!openAddField);
  const handleClose = () => setOpenAddField(false);

  const handleAdd = () => {
    const newTitle = addTitleRef.current.value;
    handleAddColumn(newTitle);
    setInputAddColumn("");
  };

  return (
    <>
      {openAddField ? (
        <AddFieldStyled>
          <input
            type="text"
            placeholder="Enter list title..."
            className="input-editable"
            value={inputAddColumn}
            onChange={handleInputChange}
            autoFocus
            ref={addTitleRef}
          />
          <div className="feature">
            <button className="add-btn" onClick={handleAdd}>
              Add list
            </button>
            <i
              className="fa-solid fa-xmark close-btn"
              onClick={handleClose}
            ></i>
          </div>
        </AddFieldStyled>
      ) : (
        <AddToggleCol handleToggleAddColumn={handleToggleAddColumn} />
      )}
    </>
  );
};

export default AddField;
