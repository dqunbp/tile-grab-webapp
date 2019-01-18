const isProduction = process.env.NODE_ENV === "production";
export const {
  REACT_APP_BACKEND_URL: backendUrl = isProduction
    ? `${window.location.protocol}//${window.location.host}`
    : "http://localhost:5000"
} = process.env;
