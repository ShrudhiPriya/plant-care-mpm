import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useRouter } from "next/router";
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
  HandHoldingHeart,
} from "react-flaticons";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState([]);
  // const [guide, setGuide] = useState([]);
  const noImage =
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";
  const [openDescription, setOpenDescription] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPlant();
    // getPlantCareGuide();
  }, []);

  async function getPlant() {
    try {
      const plant = await apiClient.getPlantDetails(id);
      setPlant(plant);
    } catch (error) {
      console.log(error);
    }
  }

  // async function getPlantCareGuide() {
  //   try {
  //     const careGuide = await apiClient.getPlantGuide(id);
  //     setGuide(careGuide);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function handleGoBack(e) {
    e.preventDefault();
    // Not suer why it has to be greater than 2
    const hasPreviousPage = window.history.length > 2;
    console.log(hasPreviousPage);
    if (!hasPreviousPage) {
      return navigate("/catalog");
    }
    return navigate(-1);
  }

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  return (
    <div className="container">
      <div className="row">
        {/* <Link to={-1}>Catalog</Link> */}
        <button onClick={handleGoBack}>Catalog</button>
        <div className="col-4">
          <img
            src={plant.small_url ? plant.small_url : noImage}
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
          <div className="row bg-success-subtle p-3 rounded">
            <div className="col-6">
              <Tree />
              <p>
                <strong>Type:</strong> {plant.type}
              </p>
              <Home />
              <p>
                <strong>Indoor:</strong> {plant.indoor === false ? "No" : "Yes"}
              </p>
              <User />
              <p>
                <strong>Poisonous to humans:</strong>{" "}
                {plant.poisonous_to_humans ? "Yes" : "No"}
              </p>
              <Paw />
              <p>
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
              <CloudSun />
              <p>
                <strong>Sunlight:</strong> {plant.sunlight}
              </p>
              <Scissors />
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
      <div className="row mt-3 mb-4">
        <div className="col">
          <Button
            onClick={() => setOpenDescription(!openDescription)}
            aria-controls="description"
            aria-expanded={openDescription}
            className="btn btn-primary"
          >
            {openDescription ? "Close description" : "Open description"}
          </Button>
        </div>
        <div className="col">
          <Button
            onClick={() => setOpenGuide(!openGuide)}
            aria-controls="care-guide"
            aria-expanded={openGuide}
            className="btn btn-success"
          >
            {openGuide ? "Close care guide" : "Open care guide"}
          </Button>
        </div>
      </div>
      <div>
        <Collapse in={openDescription}>
          <div
            className="card card-body bg-body-secondary text-start"
            id="description"
          >
            <h5>Description</h5>
            <p>{plant.description}</p>
          </div>
        </Collapse>
        <Collapse in={openGuide}>
          <div id="care-guide">
            <div className="card card-body bg-body-secondary text-start">
              <div className="row">
                <div className="col-1">
                  <HandHoldingHeart />
                </div>
                <div className="col-2">
                  <h5>Care Guide</h5>
                </div>
              </div>
              <div className="mt-2 mb-3">
                <h6>Watering</h6>
                {plant.watering_description ? (
                  <p>{plant.watering_description}</p>
                ) : (
                  "Sorry, no watering information available."
                )}
              </div>
              <div className="mt-2 mb-3">
                <h6>Sunlight</h6>
                {plant.sunlight_description ? (
                  <p>{plant.sunlight_description}</p>
                ) : (
                  "No sunlight information available."
                )}
              </div>
              <div className="mt-2 mb-3">
                <h6>Pruning</h6>
                {plant.pruning_description ? (
                  <p>{plant.pruning_description}</p>
                ) : (
                  "No pruning information available."
                )}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
