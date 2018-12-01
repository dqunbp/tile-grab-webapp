import React, {
  forwardRef,
  useImperativeMethods,
  useRef,
  useMemo,
  useState,
  useCallback
} from "react";

export function Input(
  {
    autoFocus = false,
    label,
    name,
    type,
    pattern,
    min,
    max,
    step,
    required = false,
    placeholder
  },
  ref
) {
  const inputRef = useRef();
  const [value, setValue] = useState(typeof min === "number" ? min : "");

  useImperativeMethods(ref, () => ({
    name,
    value
  }));

  const onChange = useCallback(e => setValue(e.target.value), []);

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
          autoFocus={autoFocus}
          required={required}
          pattern={pattern}
          type={type}
          min={min}
          max={max}
          step={step}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    ),
    [value]
  );
}

export default forwardRef(Input);
