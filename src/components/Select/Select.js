import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeMethods
} from "react";

export function Select({ initialValue, name, label, children }, ref) {
  const selectRef = useRef();
  const [value, setValue] = useState(initialValue);

  useImperativeMethods(ref, () => ({
    name: selectRef.current.name,
    value: selectRef.current.value
  }));

  return (
    <div className="form-input">
      <div className="input-header">
        <label className="input-header__label" htmlFor={name}>
          {label}
        </label>
      </div>
      <select
        ref={selectRef}
        className="select"
        name={name}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        {children}
      </select>
    </div>
  );
}

export default forwardRef(Select);
