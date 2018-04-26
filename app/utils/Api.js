export const createResource = data =>
  fetch("http://localhost:8080/sites", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: data.title,
      url: data.url,
      description: data.description
    })
  });

export const editResource = data =>
  fetch(`http://localhost:8080/sites/${data._id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: data.title,
      url: data.url,
      description: data.description
    })
  });

export const deleteResource = id =>
  fetch(`http://localhost:8080/sites/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
