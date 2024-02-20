// require("dotenv").config();
import { useState, useEffect } from 'react'

import './App.css'
import { apiClient } from './api'
import BooleanFilter from './components/BooleanFilter'


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

  function clearParams(e) {
    e.preventDefault()
    setParams({"indoor": null, "edible": null, "poisonous": null, "query": ""})
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
    <div className='container'>
      <h2 className='display-3 mb-4'>Find your favourite plants</h2>
      <form >
        <BooleanFilter value={"indoor"} setParams={setParams} params={params} />
        <BooleanFilter value={"edible"} setParams={setParams} params={params}/>
        <BooleanFilter value={"poisonous"} setParams={setParams} params={params}/>         
        <input onChange={(e) => setParams({...params, "query": e.target.value})} placeholder="Search by name" name="search-bar" className='form-control m-3' ></input>
        <button onClick={clearParams} className='btn btn-light me-2 mb-4'>Clear</button>
        <button className='btn btn-success mb-4'>Search</button>
      </form>

      <div>{error}</div>

      <div className='row'>
        {plants.map(plant => 
          <div key={plant.id} className='col' >
            <p>{plant.scientific_name}</p>
            {/* https://stackoverflow.com/questions/40108298/react-get-object-inside-another-object */}
            <img src={plant.default_image && plant.default_image.thumbnail ? plant.default_image.thumbnail : null} className='rounded mb-5'/>
          </div>)}
      </div>

    </div>
  )
}

export default App
