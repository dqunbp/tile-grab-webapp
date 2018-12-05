import React, {
  forwardRef,
  useMemo,
  useRef,
  useImperativeMethods
} from "react";

export function Input({ label, name, value, ...restProps }, ref) {
  const inputRef = useRef();
  useImperativeMethods(ref, () => ({
    name,
    validity: inputRef.current.validity,
    checkValidity: () => inputRef.current.checkValidity()
  }));
  return useMemo(
    () => (
      <div className="form-input">
        <div className="input-header">
          <label className="input-header__label" htmlFor={name}>
            {label}
          </label>
        </div>
        <input
          ref={inputRef}
          className="input"
          name={name}
          value={value}
          {...restProps}
        />
      </div>
    ),
    [value]
  );
}

export default forwardRef(Input);
