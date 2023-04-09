import React from "react";
import "./column.scss";
import AddIcon from "@mui/icons-material/Add";

function BtnAddCard(props) {
  const { handleToggleFormCard } = props;
  return (
    <div
      className="new-card-actions"
      style={{
        paddingBottom: "10px",
        paddingTop: "5px",
        lineHeight: "36px",
      }}
      onClick={handleToggleFormCard}
    >
      <AddIcon className="icon" />
      Add another card
    </div>
  );
}

export default BtnAddCard;
