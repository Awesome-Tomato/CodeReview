export function searchCountry(keyword) {
  const url = `/api/search?keyword=${keyword}`;
  return fetch(url).then((res) => res.json());
}
