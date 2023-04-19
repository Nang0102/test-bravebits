import React from "react";

function InputAboutArticle({ setAbout, about }) {
  return (
    <fieldset className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="What's this article about?"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
    </fieldset>
  );
}

export default InputAboutArticle;
