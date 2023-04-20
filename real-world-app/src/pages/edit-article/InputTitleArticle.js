import React, { memo } from "react";

const InputTitleArticle = memo(({ title, setTitle }) => {
  return (
    <fieldset className="form-group">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </fieldset>
  );
});

export default memo(InputTitleArticle);
