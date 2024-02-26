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

/*GET plant details from the DB */
// router.get("/:id", )

/*GET plant details in DB*/
router.get("/:id", checkIdInDatabase, async function (req, res) {
  const id = req.params.id;

  // let { details, care } = req.body;

  const details = getSpeciesDetails(id);
  const care = getSpeciesCare(id);

  try {
    await db(
      `INSERT INTO plants (${Object.keys(details)}, ${Object.keys(
        care
      )}) VALUES (${Object.values(details)}, ${Object.values(care)})`
    );
    res.send(`Plant with plant_api_id ${id} inserted`);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function getSpeciesDetails(id) {
  const response = await fetch(
    `https://perenual.com/api/species/details/${id}?key=${process.env.API_KEY}`
  );
  const results = await response.json();

  return {
    plant_api_id: results.id,
    common_name: results.common_name,
    scientific_name: results.scientific_name,
    type: results.type,
    propagation: results.propagation,
    watering: results.watering,
    sunlight: results.sunlight,
    pruning_month: results.pruning_month,
    indoor: results.indoor,
    flowers: results.flowers,
    edible_fruit: results.edible_fruit,
    edible_leaf: results.edible_leaf,
    poisonous_to_humans: results.poisonous_to_humans,
    poisonous_to_pets: results.poisonous_to_pets,
    plant_description: results.description,
    thumbnail: results.default_image ? results.default_image.thumbnail : null,
    medium_image: results.default_image
      ? results.default_image.small_url
      : null,
  };
}

async function getSpeciesCare(id) {
  const results = (
    await fetch(
      `https://perenual.com/api/species-care-guide-list?key=${process.env.API_KEY}&species_id=${id}`
    )
  ).json();

  return !results.data
    ? null
    : results.data.section[0].map((section) => ({
        [`${section.type}_description`]: section.description,
      }));
}
module.exports = router;
