import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
// import { useRouter } from "next/router";
import { apiClient } from "../apiClient"; // To handle API requests 
import {
  Home,
  Leaf,
  HandHoldingSeeding,
  Paw,
  User,
  AppleWhole,
  CloudSun,
  Flower,
  WaterBottle,
  Tree,
  Scissors,
  HandHoldingHeart,
} from "react-flaticons"; //To import icons from react-flaticons library
import Button from "react-bootstrap/Button"; //cretae buttons in the UI, (props like onCLick, variant,size)
import Collapse from "react-bootstrap/Collapse"; //create collapsible elements in the user interface. Allows content to be shown or hidden based on a toggle state. takes a boolean in prop to control whether the content should be shown or hidden.

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState([]); //Holds the details of the plant fetched from the API. 
  //It stores a URL for a default image to be displayed in case the plant image is not available.
  const noImage =
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";
  const [openDescription, setOpenDescription] = useState(false);//variables are used to toggle the visibility of description and care guide sections respectively.
  const [openGuide, setOpenGuide] = useState(false);//variables are used to toggle the visibility of description and care guide sections respectively.
  const navigate = useNavigate();
  // hook used for navigation in a React application. It returns a navigate function that can be used to programmatically 
  // navigate the user to different routes within the application without directly relying on <Link> components or <a> tags.

  useEffect(() => {
    getPlant(); 
    // getPlantCareGuide();
    // fetching plant details when the component mounts using the getPlant function.
  }, []);

// It's an asynchronous function that fetches plant details 
// using the apiClient.getPlantDetails method and updates the plant state variable accordingly.
  async function getPlant() {
    try {
      const plant = await apiClient.getPlantDetails(id);
      setPlant(plant);
    } catch (error) {
      console.log(error);
    }
  }

// It's a function that handles navigation either to the catalog page or the previous page in 
// the browser's history, depending on whether there's a previous page in the history stack.
  function handleGoBack(e) {
    e.preventDefault();
    // Not suer why it has to be greater than 2. I think it is related to the useEffect calling twice.
    const hasPreviousPage = window.history.length > 2;
    if (!hasPreviousPage) {
      return navigate("/catalog");
    }
    return navigate(-1);
  }

/* 
1. The UI consists of a container with buttons for navigation, a section displaying plant details 
such as images, common and scientific names, and various attributes like type, indoor status, 
poisonous nature, etc.
2. Buttons are provided to toggle the visibility of description and care guide sections.
3. Description and care guide sections are collapsible (Collapse component from React Bootstrap) 
   and their visibility is controlled by the openDescription and openGuide state variables respectively.
*/
  return (
    <div className="container">
      <button onClick={handleGoBack} className="btn btn-secondary mb-3">
        Catalog
      </button>
      <div className="row">
        <div className="col-4">
          <img
            src={plant.medium_image ? plant.medium_image : noImage}
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
                <strong>Sunlight:</strong>{" "}
                {plant.sunlight ? plant.sunlight.join(", ") : null}
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
            {plant.plant_description ? (
              <p>{plant.plant_description}</p>
            ) : (
              "No description available."
            )}
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
                  "No watering information available."
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
