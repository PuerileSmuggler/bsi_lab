export const request = async (url: string, body: any) => {
  return fetch(`http:\\\\localhost:4000/${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem(tokenStorageKey) || "",
    },
  }).then(async (response) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    throw new Error(response.status.toString());
  });
};

export const tokenStorageKey = "___TOKEN___";
