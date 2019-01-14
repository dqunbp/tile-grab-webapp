import React, { forwardRef, useRef, useImperativeMethods } from "react";

export function Select({ name, label, children, ...restProps }, ref) {
  const selectRef = useRef();

  useImperativeMethods(ref, () => ({
    name: selectRef.current.name,
    value: selectRef.current.value,
    validity: selectRef.current.validity,
    checkValidity: () => selectRef.current.checkValidity()
  }));
  return (
    <div className="form-input">
      <div className="input-header">
        <label className="input-header__label" htmlFor={name}>
          {label}
        </label>
      </div>
      <select ref={selectRef} className="select" name={name} {...restProps}>
        {children}
      </select>
    </div>
  );
}

export default forwardRef(Select);
