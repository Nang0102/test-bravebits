import React, { memo } from "react";

const InputEmail = memo((props) => {
  const { email, setEmail, setErrors } = props;
  console.log("email", email);

  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors(null);
        }}
      />
    </fieldset>
  );
});

export default memo(InputEmail);
