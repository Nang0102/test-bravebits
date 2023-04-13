import React from "react";

function Input(props) {
  const {
    type,
    placeholder,
    rows,
    handleUserNameChange,
    userName,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
  } = props;
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type={type}
        placeholder={placeholder}
        rows={rows}
        // userName={userName}
        // handleUserNameChange={handleUserNameChange}
        // email={email}
        // handleEmailChange={handleEmailChange}
        // password={password}
        // handlePasswordChange={handlePasswordChange}
        value={userName || email || password}
        onChange={
          handleUserNameChange || handleEmailChange || handlePasswordChange
        }
      />
    </fieldset>
  );
}

export default Input;
