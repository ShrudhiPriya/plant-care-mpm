// require("dotenv").config();
import { useState, useEffect } from 'react'

import './App.css'
import { apiClient } from './api'


// const API_KEY = import.meta.env.API_KEY

function App() {
  const [plants, setPlants] = useState([])
  const [error, setError] = useState("")
  const [params, setParams] = useState({"indoor": null, "edible": null, "poisonous": null, "query": ""})

  
  useEffect(() => {
    getPlants();
  }, [])

  async function getPlants() {
    try {
      const plants = await apiClient.searchPlants()
      setPlants(plants.data)
    } catch (error) {
      setError(error)
    }
  }

  // async function handleSubmit(event) {
  //   event.preventDefault()
  //   setError("")
  //   await filterPlants()
  //   setQuery("")
  //   setFilter("")    
  // }

  // async function filterPlants() {
  //   plants.map(plant => )
  // }

  return (
    <>
      <h1>Find your favourite plants</h1>
      <form >
        <div >
          <label>Indoor</label>      
            <input onClick={() => setParams({...params, "indoor": true})} type="radio" name="indoor" id="indoor=1" />Yes
            <input onClick={() => setParams({...params, "indoor": false})} type="radio" name="indoor" id="indoor=0" />No
        </div>
        <div>
          <label>Edible</label>      
            <input onClick={() => setParams({...params, "edible": true})} type="radio" name="edible" id="edible=1" />Yes
            <input onClick={() => setParams({...params, "edible": false})} type="radio" name="edible" id="edible=0" />No
        </div>
        <div>
          <label>Poisonous</label>      
            <input onClick={() => setParams({...params, "poisonous": true})} type="radio" name="poisonous" id="poisonous=1" />Yes
            <input onClick={() => setParams({...params, "poisonous": false})} type="radio" name="poisonous" id="poisonous=0" />No
        </div>
        
          
        <input onChange={(e) => setParams({...params, "query": e.target.value})} placeholder="Search by name" name="search-bar"></input>
        <button>Search</button>
      </form>

      <div>{error}</div>

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
