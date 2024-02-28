// Uncomment this to use the example data:
// import {
//   plantsPage,
//   speciesDetail,
// } from "../../data/example_plants";

const apiClient = {
  searchPlants: async function (params) {
    // To not call the API comment this:
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/catalog?${queryString}`);
    return await response.json();

    // And uncomment this:
    // return plantsPage
  },
  getPlantDetails: async function (id) {
    // To not call the API comment this:
    const response = await fetch(`/api/catalog/${id}`);
    return await response.json();

    // And uncomment this:
    // return speciesDetail
  },
};

export { apiClient };
