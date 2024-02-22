import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../apiClient";

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
    <>
      <Link to="/catalog">Catalog</Link>
      <div>PlantDetail {id}</div>
      <div>
        <h3>
          <strong>{plant.common_name}</strong>
        </h3>
        <h5>
          <em>{plant.scientific_name}</em>
        </h5>
        <img
          src={
            plant.default_image && plant.default_image.small_url
              ? plant.default_image.small_url
              : noImage
          }
          className="rounded mb-1"
        />
        <p>{plant.description}</p>
        <p>Type: {plant.type}</p>
        <p>Indoor: {plant.indoor === false ? "No" : "Yes"}</p>
        <p>Poisonous to humans: {plant.poisonous_to_humans ? "Yes" : "No"}</p>
        <p>Poisonous to pets: {plant.poisonous_to_pets ? "Yes" : "No"}</p>
        <p>Edible leafs: {plant.edible_leaf ? "Yes" : "No"}</p>
        <p>Edible fruits: {plant.edible_fruit ? "Yes" : "No"}</p>
        <p>Flowers: {plant.flowers ? "Yes" : "No"}</p>
        <p>Watering: {plant.watering}</p>
        <p>Sunlight: {plant.sunlight}</p>
        <p>
          Pruning: {plant.pruning_month ? plant.pruning_month.join(", ") : null}
        </p>
        <p>
          Propagation: {plant.propagation ? plant.propagation.join(", ") : null}
        </p>
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
    </>
  );
}
