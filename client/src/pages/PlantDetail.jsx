import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function PlantDetail() {
  const { id } = useParams()
  return (
    <>
        <Link to="/catalog">Catalog</Link>
        <div>PlantDetail {id}</div>
    </>
    
  )
}
