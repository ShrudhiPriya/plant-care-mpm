import {Routes, Route} from "react-router-dom"
import React from "react"
import './App.css'
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"

// require("dotenv").config();
// const API_KEY = import.meta.env.API_KEY

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </>
    
  )
 
}

export default App
