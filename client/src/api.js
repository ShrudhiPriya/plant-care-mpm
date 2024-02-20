import { plantsPage } from "./example_plants";

const apiClient = {
  getPlants: async function (params) {
    return plantsPage;
  },
};

export { apiClient };
