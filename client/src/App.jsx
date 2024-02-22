import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PlantDetail from "./pages/PlantDetail";
import Favorites from "./pages/Favorites";

// require("dotenv").config();
// const API_KEY = import.meta.env.API_KEY

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<PlantDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
