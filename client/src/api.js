import { plantsPage } from "../../data/example_plants";
//????? import App from "./App";

const apiClient = {
  searchPlants: async function (params, page) {
    return plantsPage;
  },
};

export { apiClient };
