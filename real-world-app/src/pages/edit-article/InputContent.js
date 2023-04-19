import React from "react";

function InputContent({ content, setContent }) {
  return (
    <fieldset className="form-group">
      <textarea
        className="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </fieldset>
  );
}

export default InputContent;
