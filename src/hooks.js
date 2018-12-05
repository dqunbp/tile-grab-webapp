import { useCallback, useState, useRef } from "react";

export function useInput(initial) {
  const isNumber = typeof initial === "number";
  const ref = useRef();
  const [value, setValue] = useState(initial);
  const onChange = useCallback(e => {
    let { value, type } = e.target;
    setValue(type !== "number" ? value : Number(value));
  }, []);

  const isValid = useCallback(ref => ref.current.checkValidity(), [
    ref.current,
    value
  ]);
  return {
    ref,
    value,
    setValue,
    isValid: ref.current && ref.current.validity ? isValid(ref) : false,
    hasValue:
      value !== undefined &&
      value !== null &&
      (!isNumber ? value.trim && value.trim() !== "" : true),
    reset: useCallback(() => setValue(initial), []),
    focus: useCallback(() => ref.current.focus(), []),
    onChange,
    bindToInput: {
      ref,
      onChange,
      value
    }
  };
}
