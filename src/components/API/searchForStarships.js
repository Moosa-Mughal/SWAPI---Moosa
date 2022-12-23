import API from "./API";

export const searchForStarships = async (element, page) => {
  let search = `starships/?search=${element}&page=${page}`;
  return await API.get(search)
    .then((results) => {
      return results.data;
    })
    .catch((err) => console.log("Error", err));
};
