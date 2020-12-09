export const request = async (
  url: string,
  method: "POST" | "GET" | "DELETE",
  body?: any,
) => {
  return fetch(`http:\\\\localhost:4000/${url}`, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(tokenStorageKey)}` || "",
    },
  }).then(async (response) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    throw await response.json();
  });
};

export const tokenStorageKey = "___TOKEN___";
