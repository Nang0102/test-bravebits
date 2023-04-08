import React from "react";
import "./boardContent.scss";
import AddIcon from "@mui/icons-material/Add";

function BtnAdd(props) {
  const { handleToggleForm } = props;
  return (
    <div className="add-new-column" onClick={handleToggleForm}>
      <AddIcon className="icon" />
      Add another column
    </div>
  );
}

export default BtnAdd;
