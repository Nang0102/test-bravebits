import React from "react";
import { Button, Tag, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";

export function TextFilter({ tagname, handleSaveBtn }) {
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );
  return (
    <div style={{ margin: 15 }}>
      {tagname && (
        <div style={{ marginBottom: "10px" }}>
          <Tag>Visibility is {tagname}</Tag>
        </div>
      )}
      <TextField
        label="Save as"
        type="email"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        placeholder="Ready to publish, work in progress"
        helpText="Filters are saved as a new tab at the top of this list."
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        <Button onClick={handleSaveBtn}>Cancel</Button>
        <Button primary disabled={textFieldValue.trim() !== "" ? false : true}>
          Save filters
        </Button>
      </div>
    </div>
  );
}
