import React, { memo } from "react";

const InputTag = memo(({ inputTag, setInputTag, handleAddTag }) => {
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
});

export default memo(InputTag);
