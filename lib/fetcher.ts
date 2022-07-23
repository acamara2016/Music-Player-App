export default async function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch(() => {
      throw new Error("");
    });
}
