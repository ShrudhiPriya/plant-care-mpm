const db = require("../model/helper");

async function checkIdInDatabase(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const response = await db(
      `SELECT * FROM plants WHERE plant_api_id = ${id}`
    );
    if (!response.data.length) {
      next();
    } else {
      const dbResult = response.data[0];
      const plant = {
        id: dbResult.plant_api_id,
        common_name: dbResult.common_name,
        scientific_name: JSON.parse(dbResult.scientific_name),
        type: dbResult.plant_type,
        propagation: JSON.parse(dbResult.propagation),
        watering: dbResult.watering,
        sunlight: JSON.parse(dbResult.sunlight),
        pruning_month: JSON.parse(dbResult.pruning_month),
        indoor: dbResult.indoor === 1 ? true : false,
        flowers: dbResult.flowers === 1 ? true : false,
        edible_fruit: dbResult.edible_fruit === 1 ? true : false,
        edible_leaf: dbResult.edible_leaf === 1 ? true : false,
        poisonous_to_humans: dbResult.poisonous_to_humans === 1 ? true : false,
        poisonous_to_pets: dbResult.poisonous_to_pets === 1 ? true : false,
        plant_description: dbResult.description,
        medium_image: dbResult.medium_image,
        watering_description: dbResult.watering_description,
        sunlight_description: dbResult.sunlight_description,
        pruning_description: dbResult.pruning_description,
      };

      res.status(200).send(plant);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = checkIdInDatabase;
