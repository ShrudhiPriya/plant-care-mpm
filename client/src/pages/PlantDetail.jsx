import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../apiClient";
import {
  Home,
  Leaf,
  HandHoldingSeeding,
  Paw,
  User,
  Sun,
  CalendarPen,
  AppleWhole,
  CloudSun,
  Flower,
  WaterBottle,
  Tree,
  Scissors,
} from "react-flaticons";

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState([]);
  const [guide, setGuide] = useState([]);
  const noImage =
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";

  useEffect(() => {
    getPlant();
    getPlantCareGuide();
  }, []);

  //   async function getPlant() {
  //     try {
  //       const response = await fetch(`/api/catalog/${id}`);
  //       const data = await response.json();
  //       setPlant(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  async function getPlant() {
    try {
      const plant = await apiClient.getPlantDetails(id);
      setPlant(plant);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPlantCareGuide() {
    try {
      const careGuide = await apiClient.getPlantGuide(id);
      setGuide(careGuide);
    } catch (error) {
      console.log(error);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container">
      <div className="row">
        <Link to="/catalog">Catalog</Link>
        <div className="col-4">
          <img
            src={
              plant.default_image && plant.default_image.small_url
                ? plant.default_image.small_url
                : noImage
            }
            className="rounded mb-1 img-fluid"
          />
          <div>
            <h3>
              <strong>{plant.common_name}</strong>
            </h3>
            <h5>
              <em>{plant.scientific_name}</em>
            </h5>
          </div>
        </div>

        <div className="col-8">
          <div>
            <p>{plant.description}</p>
          </div>
          <div className="row">
            <div className="col-6">
              <Tree />
              <p>
                <strong>Type:</strong> {plant.type}
              </p>
              <Home />
              <p>
                <strong>Indoor:</strong> {plant.indoor === false ? "No" : "Yes"}
              </p>
              <p>
                <User />
                <strong>Poisonous to humans:</strong>{" "}
                {plant.poisonous_to_humans ? "Yes" : "No"}
              </p>
              <p>
                <Paw />
                <strong>Poisonous to pets:</strong>{" "}
                {plant.poisonous_to_pets ? "Yes" : "No"}
              </p>
              <Leaf />
              <p>
                <strong>Edible leafs:</strong>{" "}
                {plant.edible_leaf ? "Yes" : "No"}
              </p>
              <AppleWhole />
              <p>
                <strong>Edible fruits:</strong>{" "}
                {plant.edible_fruit ? "Yes" : "No"}
              </p>
            </div>
            <div className="col-6">
              <Flower />
              <p>
                <strong>Flowers:</strong> {plant.flowers ? "Yes" : "No"}
              </p>
              <WaterBottle />
              <p>
                <strong>Watering:</strong> {plant.watering}
              </p>
              <Sun />
              <CloudSun />
              <p>
                <strong>Sunlight:</strong> {plant.sunlight}
              </p>
              <Scissors /> <CalendarPen />
              <p>
                <strong>Pruning:</strong>{" "}
                {plant.pruning_month ? plant.pruning_month.join(", ") : null}
              </p>
              <HandHoldingSeeding />
              <p>
                <strong>Propagation:</strong>{" "}
                {plant.propagation ? plant.propagation.join(", ") : null}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {guide.data
          ? guide.data[0].section.map((section) => (
              <div key={section.id}>
                <h5>{capitalizeFirstLetter(section.type)}</h5>
                <p>
                  {section.description
                    ? section.description
                    : `No ${section.type} information available.`}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
