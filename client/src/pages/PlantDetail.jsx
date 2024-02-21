import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../apiClient";

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    getPlant();
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

  return (
    <>
      <Link to="/catalog">Catalog</Link>
      <div>PlantDetail {id}</div>
      <div>{plant.common_name}</div>
    </>
  );
}
