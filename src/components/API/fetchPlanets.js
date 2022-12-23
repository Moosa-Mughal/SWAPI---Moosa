import API from "./API";

export const fetchPlanets = async (page) => {
  return await API.get(`planets/?page=${page}`)
    .then((results) => {
      return results.data;
    })
    .catch((err) => console.log("Error", err));
};
