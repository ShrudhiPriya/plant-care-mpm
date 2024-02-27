import {
  // plantsPage,
  speciesDetail,
  // speciesGuide,
} from "../../data/example_plants";

const apiClient = {
  searchPlants: async function (params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/catalog?${queryString}`);

    return await response.json();
  },
  getPlantDetails: async function (id) {
    const response = await fetch(`/api/catalog/${id}`);
    return await response.json();
  },
};

export { apiClient };
