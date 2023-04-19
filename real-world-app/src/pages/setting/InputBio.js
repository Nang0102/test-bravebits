import React, { memo } from "react";

const InputBio = memo(({ bio, setBio, setErrors }) => {
  return (
    <fieldset className="form-group">
      <textarea
        className="form-control form-control-lg"
        rows="8"
        placeholder="Short bio about you"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
          setErrors(null);
        }}
      ></textarea>
    </fieldset>
  );
});

export default InputBio;
