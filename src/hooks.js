import { useCallback, useState, useRef, useEffect } from "react";
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

export function useDndFileReader(nodeRef, cb) {
  let [error, setError] = useState(null);
  let [dragover, setDragover] = useState(false);
  let readAndParseFile = useCallback((event, callback) => {
    event.preventDefault();
    setError(null);
    let reader = new FileReader();
    reader.readAsText(event.dataTransfer.files[0]);
    reader.onload = function(event) {
      try {
        setDragover(false);
        callback(JSON.parse(event.target.result));
      } catch (err) {
        console.error("Loading file error", err);
        setError(err);
      }
    };
  }, []);
  useEffect(
    () => {
      if (nodeRef.current) {
        console.log(nodeRef);
        let { current: node } = nodeRef;
        // node.ondragover = () => false;
        // node.ondragend = () => false;
        node.ondragover = e => e.preventDefault();
        node.ondragenter = () => setDragover(true);
        node.ondragleave = () => setDragover(false);
        node.ondrop = e => readAndParseFile(e, cb);
      }
    },
    [nodeRef.current]
  );
  return [dragover, error];
}
