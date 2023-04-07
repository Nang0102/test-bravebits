import React from "react";
import "./column.scss";
import AddIcon from "@mui/icons-material/Add";

function BtnAddCard(props) {
  const { handleToggleFormCard } = props;
  return (
    <div className="footer-actions" onClick={handleToggleFormCard}>
      <AddIcon className="icon" />
      Add another card
    </div>
  );
}

export default BtnAddCard;
