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
    queryString += `&page=${toApiBoolean(page)}`;
  }
  return queryString;
}

function toApiBoolean(booleanString) {
  return booleanString === "true" ? 1 : 0;
}

module.exports = router;
