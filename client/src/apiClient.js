import {
  plantsPage,
  speciesDetail,
  speciesGuide,
} from "../../data/example_plants";

//????? import App from "./App";

const apiClient = {
  searchPlants: async function (params, page) {
    return plantsPage;
  },
  getPlantDetails: async function (id) {
    return speciesDetail;
  },
  getPlantGuide: async function (id) {
    return speciesGuide;
  },
};

export { apiClient };
