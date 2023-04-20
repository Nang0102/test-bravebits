import React, { memo } from "react";

const InputUserName = memo((props) => {
  const { userName, setUserName, setErrors } = props;
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        value={userName}
        placeholder="Your Name"
        type="text"
        onChange={(e) => {
          setUserName(e.target.value);
          setErrors(null);
        }}
      />
    </fieldset>
  );
});

export default memo(InputUserName);
