import React from "react";

function InputTag({ inputTag, setInputTag, handleAddTag }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Enter tags"
      value={inputTag}
      onChange={(e) => setInputTag(e.target.value)}
      onKeyDown={handleAddTag}
    />
  );
}

export default InputTag;
