var express = require("express");
var router = express.Router();
require("dotenv/config");
const checkIdInDatabase = require("../guards/checkIdInDatabase.js");

/* GET query params. */
router.get("/", async function (req, res) {
  const query = mapQueryParams(req.query);

  try {
    const apiResponse = await fetch(
      `https://perenual.com/api/species-list?key=${process.env.API_KEY}&${query}`
    );
    const apiPage = await apiResponse.json();
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
  const id = req.params.id;

  const details = getSpeciesDetails(id);

  try {
    await db(`INSERT INTO plants () VALUES ()`);
    res.send(`Plant with plant_api_id ${id} inserted`);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function getSpeciesDetails(id) {
  const response = await fetch(
    `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`
  );
  const details = await response.json();

  const data = await fetch(
    `https://perenual.com/api/species-care-guide-list?key=${process.env.API_KEY}&species_id=${id}`
  );
  const descriptions = await data.json();

  const careDescriptions = descriptions.data
    ? descriptions.data[0].section[0].map((section) => ({
        [`${section.type}_description`]: section.description,
      }))
    : null;

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
    poisonous_to_humans: details.poisonous_to_humans,
    poisonous_to_pets: details.poisonous_to_pets,
    plant_description: details.description,
    medium_image: details.default_image
      ? details.default_image.small_url
      : null,
    watering_description: careDescriptions[watering_description],
    sunlight_description: careDescriptions[sunlight_description],
    pruning_description: careDescriptions[pruning_description],
  };
}

module.exports = router;
