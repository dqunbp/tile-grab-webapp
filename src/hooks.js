import { useCallback, useState, useRef } from "react";

export function useInput(initial, numAsString = true) {
  const ref = useRef();
  // const isNumber = ref.current ? ref.current.type === "number" : false;
  const [value, setValue] = useState(initial);
  const onChange = useCallback(e => {
    let { value, type } = e.target;
    setValue(type !== "number" || numAsString ? value : Number(value));
  });

  return {
    ref,
    value,
    setValue,
    hasValue:
      value !== undefined &&
      value !== null &&
      (typeof value === "string" ? value.trim && value.trim() !== "" : true),
    reset: useCallback(() => setValue(initial), []),
    clear: useCallback(() => setValue(""), []),
    focus: useCallback(() => ref.current.focus(), [ref.current]),
    onChange,
    bindToInput: {
      ref,
      onChange,
      value
    }
  };
}
