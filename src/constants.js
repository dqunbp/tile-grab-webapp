const isProduction = process.env.NODE_ENV === "production";
export const HOST = isProduction
  ? process.env.REACT_APP_HOST
  : "http://localhost:5000";
