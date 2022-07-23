export default async function fetcher(url: string, data = undefined) {
  console.log(`${window.location.origin}/api/${url}`);
  return await fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw new Error("");
    });
}
