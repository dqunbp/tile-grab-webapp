import React from "react";

export function Option({ value, children }) {
  return <option value={value}>{children}</option>;
}

export default Option;
