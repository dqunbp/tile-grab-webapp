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
    .then(function(res) {
      return res;
    })
    .then(function(data) {
      console.log("start downloading...");
    })
    .catch(function(error) {
      alert(JSON.stringify(error));
      console.error(error);
    });
}
