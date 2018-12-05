import axios from "axios";
import { backendUrl } from "./constants";

export function postData(url, payload) {
  fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      if (response.status >= 400 && response.status < 600) {
        // alert("Bad response from server");
        throw new Error("Bad response from server");
      }
    })
    .then(function(response) {
      return response;
    })
    .then(function(data) {
      console.log("start downloading...");
    })
    .catch(function(error) {
      alert(error);
      console.error(error);
    });
}

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: backendUrl
});
