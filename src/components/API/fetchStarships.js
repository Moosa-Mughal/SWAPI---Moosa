import API from "./API";

export const fetchStarships = async (page) => {
  return await API.get(`starships/?page=${page}`)
    .then((results) => {
      return results.data;
    })
    .catch((err) => console.log("Error", err));
};
