import React, { useMemo, useRef, useState, useEffect } from "react";

export function Input({
  autoFocus = false,
  label,
  name,
  type,
  min,
  max,
  step,
  required = false,
  value,
  placeholder,
  onChange,
  validateFunc,
  invalidValueMsg = "invalid value",
  notBeEmptyMsg = "don't be empty"
}) {
  const [isValid, setValid] = useState(!required);

  function validateValue() {
    return type === "number" ? validateFunc(value) : validateFunc(value);
  }

  const validIfNotRequired = !required || value !== "";

  useEffect(
    () => {
      // in first render input `valid` value depends on `required` var
      setValid(!validateFunc ? validIfNotRequired : validateValue(value));
    },
    [value]
  );

  function onChangeValue(e) {
    let { name, value } = e.target;
    onChange({ name, value, isValid });
  }

  const msg = !isValid ? (
    validIfNotRequired ? (
      <span className="input-footer__msg">{invalidValueMsg}</span>
    ) : (
      <span className="input-footer__msg">{notBeEmptyMsg}</span>
    )
  ) : (
    <span className="input-footer__msg">{""}</span>
  );

  return useMemo(
    () => (
      <div className="form-input">
        <div className="input-header">
          <label className="input-header__label" htmlFor={name}>
            {label}
          </label>
          {/* {required && <span className="input-header__rqrd">* required</span>} */}
          {msg}
        </div>
        <input
          className="input"
          autoFocus={autoFocus}
          type={type}
          min={min}
          max={max}
          step={step}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChangeValue}
        />
        {/* <div className="input-footer">{msg}</div> */}
      </div>
    ),
    [value, isValid]
  );
}
