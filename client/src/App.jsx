//import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import AuthContext from "./contexts/AuthContext";
import NavBar from './pages/NavBar';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from './pages/User';
import Catalog from "./pages/Catalog";
import PlantDetail from "./pages/PlantDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<PlantDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
