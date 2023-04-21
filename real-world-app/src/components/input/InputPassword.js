import React, { memo } from "react";

const InputPassword = memo((props) => {
  const { password, setPassword, setErrors } = props;
  console.log("pass", password);
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        placeholder="Your Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors(null);
        }}
      />
    </fieldset>
  );
});

export default memo(InputPassword);
