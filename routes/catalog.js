var express = require("express");
var router = express.Router();
require("dotenv/config");
const db = require("../model/helper");
const checkIdInDatabase = require("../guards/checkIdInDatabase.js");

/* GET query params. */
router.get("/", async function (req, res) {
  const query = mapQueryParams(req.query);

  try {
    const apiPage = await callApi(
      `https://perenual.com/api/species-list?key=${process.env.API_KEY}&${query}`
    );
    const response = {
      data: apiPage.data.map(mapCatalogPlant),
      page_number: apiPage.current_page,
      has_next: apiPage.current_page < apiPage.last_page,
      has_previous: apiPage.current_page > 1,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Failed to fetch the data.");
  }
});

function mapCatalogPlant(plant) {
  return {
    id: plant.id,
    common_name: plant.common_name,
    scientific_name: plant.scientific_name,
    thumbnail: plant.default_image ? plant.default_image.thumbnail : null,
  };
}

function mapQueryParams({ query, edible, indoor, poisonous, page }) {
  let queryString = "";
  if (query) {
    queryString += `q=${query}`;
  }
  if (edible) {
    queryString += `&edible=${toApiBoolean(edible)}`;
  }
  if (indoor) {
    queryString += `&indoor=${toApiBoolean(indoor)}`;
  }
  if (poisonous) {
    queryString += `&poisonous=${toApiBoolean(poisonous)}`;
  }
  if (page) {
    queryString += `&page=${page}`;
  }
  return queryString;
}

function toApiBoolean(booleanString) {
  return booleanString === "true" ? 1 : 0;
}

/*GET plant details in DB*/
router.get("/:id", checkIdInDatabase, async function (req, res) {
  try {
    const plant = await getSpeciesDetails(req.params.id);

    await db(
      `INSERT INTO plants (
          plant_api_id, 
          common_name, 
          scientific_name, 
          plant_type, 
          propagation, 
          watering, 
          sunlight, 
          pruning_month, 
          indoor, 
          flowers, 
          edible_fruit, 
          edible_leaf, 
          poisonous_to_humans, 
          poisonous_to_pets, 
          plant_description, 
          medium_image, 
          watering_description, 
          sunlight_description, 
          pruning_description
        ) 
        VALUES (
          ${plant.id}, 
          ${escapeString(plant.common_name)}, 
          ${escapeString(JSON.stringify(plant.scientific_name))}, 
          ${escapeString(plant.type)}, 
          ${escapeString(JSON.stringify(plant.propagation))}, 
          ${escapeString(plant.watering)}, 
          ${escapeString(JSON.stringify(plant.sunlight))}, 
          ${escapeString(JSON.stringify(plant.pruning_month))}, 
          ${plant.indoor}, 
          ${plant.flowers}, 
          ${plant.edible_fruit}, 
          ${plant.edible_leaf}, 
          ${plant.poisonous_to_humans}, 
          ${plant.poisonous_to_pets},
          ${escapeString(plant.plant_description)}, 
          ${escapeString(plant.medium_image)}, 
          ${escapeString(plant.watering_description)},
          ${escapeString(plant.sunlight_description)}, 
          ${escapeString(plant.pruning_description)}
        )`
    );
    res.send(plant);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

function escapeString(string) {
  if (!string) return null;
  return "'" + string.replaceAll("'", "''") + "'";
}

async function getSpeciesDetails(id) {
  const details = await callApi(
    `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`
  );

  const descriptions = await callApi(
    `https://perenual.com/api/species-care-guide-list?key=${process.env.API_KEY}&species_id=${id}`
  );

  return {
    id: details.id,
    common_name: details.common_name,
    scientific_name: details.scientific_name,
    type: details.type,
    propagation: details.propagation,
    watering: details.watering,
    sunlight: details.sunlight,
    pruning_month: details.pruning_month,
    indoor: details.indoor,
    flowers: details.flowers,
    edible_fruit: details.edible_fruit,
    edible_leaf: details.edible_leaf,
    poisonous_to_humans: details.poisonous_to_humans === 1 ? true : false,
    poisonous_to_pets: details.poisonous_to_pets === 1 ? true : false,
    plant_description: details.description,
    medium_image: details.default_image
      ? details.default_image.small_url
      : null,
    watering_description: findSectionDescription("watering", descriptions.data),
    sunlight_description: findSectionDescription("sunlight", descriptions.data),
    pruning_description: findSectionDescription("pruning", descriptions.data),
  };
}

function findSectionDescription(type, data) {
  if (!data || data.length === 0) return null;
  const sections = data[0].section;
  if (!sections) return null;
  const section = sections.filter((apiSection) => apiSection.type === type);
  if (section.length === 0) return null;
  return section[0].description;
}

async function callApi(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = "External API failed with code: " + response.status;
    let error = new Error(message);
    error.response = response;
    error.status = response.status;
    error.description = message;

    throw error;
  }

  return await response.json();
}

module.exports = router;
