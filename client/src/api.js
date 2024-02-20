import { plantsPage } from "../../data/example_plants";

const apiClient = {
  searchPlants: async function (params) {
    return plantsPage;
  },
};

export { apiClient };
