import {
  plantsPage,
  speciesDetail,
  speciesGuide,
} from "../../data/example_plants";

const apiClient = {
  searchPlants: async function (params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/catalog?${queryString}`);

    return await response.json();
  },
  getPlantDetails: async function (id) {
    return speciesDetail;
  },
  getPlantGuide: async function (id) {
    return speciesGuide;
  },
};

export { apiClient };
