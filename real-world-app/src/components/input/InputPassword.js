import React, { memo } from "react";

const InputPassword = memo((props) => {
  const { password, setPassword, setErrors } = props;
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        placeholder="Your Password"
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors(null);
        }}
      />
    </fieldset>
  );
});

export default InputPassword;
