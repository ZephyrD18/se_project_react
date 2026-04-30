export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  return res.json();
}
