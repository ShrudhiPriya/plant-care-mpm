var express = require("express");
var router = express.Router();
require("dotenv/config");

/* GET query params. */
router.get("/", async function (req, res) {
  const query = mapQueryParams(req.query);

  try {
    const result = await fetch(
      `https://perenual.com/api/species-list?key=${process.env.API_KEY}&${query}`
    );
    const response = await result.json();

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Failed to fetch the data.");
  }
});

function mapQueryParams({ query, edible, indoor, poisonous }) {
  return (
    `q=${query}` +
    `&edible=${toApiBoolean(edible)}` +
    `&indoor=${toApiBoolean(indoor)}` +
    `&poisonous=${toApiBoolean(poisonous)}`
  );
}

function toApiBoolean(booleanString) {
  return booleanString === "true" ? 1 : 0;
}

module.exports = router;
