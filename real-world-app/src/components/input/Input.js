import React from "react";

function Input(props) {
  const { type, placeholder, rows, value, onChange } = props;
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type={type}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
}

export default Input;
