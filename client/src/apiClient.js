import { plantsPage, speciesDetail } from "../../data/example_plants";

//????? import App from "./App";

const apiClient = {
  searchPlants: async function (params, page) {
    console.log(params);
    return plantsPage;
  },
  getPlantDetails: async function (id) {
    console.log(id);
    return speciesDetail;
  },
};

export { apiClient };
