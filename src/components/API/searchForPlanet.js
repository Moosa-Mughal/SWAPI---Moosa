import API from "./API";

export const searchForPlanet = async (element, page) => {
  let search = `planets/?search=${element}&page=${page}`;
  return await API.get(search)
    .then((results) => {
      return results.data;
    })
    .catch((err) => console.log("Error", err));
};
