// require("dotenv").config();
import { useState, useEffect } from 'react'

import './App.css'
import { apiClient } from './api'


// const API_KEY = import.meta.env.API_KEY

function App() {
  let[plants, setPlants] = useState([])
  
  useEffect(() => {
    getPlants();
  }, [])

  async function getPlants() {
    try {
      const plants = await apiClient.getPlants()
      setPlants(plants.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Find your favourite plants</h1>
      <form>
        <select>
          <option>Filter by...</option>
          <option>Scientific name</option>
          <option>Common name</option>
        </select>
        <input placeholder="Write your query"></input>
        <button>Search</button>
      </form>

      {/* <div>{error}</div> */}
      

      <div>
        {plants.map(plant => 
          <div key={plant.id}>
            <p>{plant.scientific_name}</p>
            {/* https://stackoverflow.com/questions/40108298/react-get-object-inside-another-object */}
            <img src={plant.default_image && plant.default_image.thumbnail ? plant.default_image.thumbnail : null}/>
          </div>)}
      </div>

    </>
  )
}

export default App
