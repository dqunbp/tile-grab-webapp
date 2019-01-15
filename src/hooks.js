import { useCallback, useState, useRef } from "react";
import axios from "axios";
import { backendUrl } from "./constants";

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

export function useApiCall(url) {
  let [state, setState] = useState({
    pending: false,
    error: null
  });
  return {
    pending: state.pending,
    error: state.error,
    call: useCallback(id => {
      setState({
        pending: true,
        error: null
      });
      axios
        .get(`${backendUrl}/${url}${id}`)
        .then(response => {
          setState({ ...state, pending: false });
          return response.data;
        })
        .catch(error => {
          setState({ error, pending: false });
        });
    }, [])
  };
}

export function useDownloadLink(id) {
  return useCallback(
    e => {
      e.preventDefault();
      window.open(`${backendUrl}/download/${id}`, "_blank");
    },
    [id]
  );
}
