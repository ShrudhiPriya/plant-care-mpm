// require("dotenv").config();
import { useState, useEffect } from 'react'

import './App.css'
import { apiClient } from './api'
import RadioInput from './components/RadioInput'

// const API_KEY = import.meta.env.API_KEY

function App() {
  const [plants, setPlants] = useState([])
  const [error, setError] = useState("")
  const [params, setParams] = useState({"indoor": null, "edible": null, "poisonous": null, "query": ""})
  const noImage = "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png"

  
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
    console.log(params)
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
        <div className='row'>
          <RadioInput value={"indoor"} setParams={setParams} params={params} />
          <RadioInput value={"edible"} setParams={setParams} params={params}/>
          <RadioInput value={"poisonous"} setParams={setParams} params={params}/>
        </div>
                
        <input 
          onChange={(e) => setParams({...params, "query": e.target.value})} 
          placeholder="Search by name" 
          name="search-bar" 
          className='form-control m-3 row w-50' 
        ></input>
        <button type="reset" onClick={clearParams} className='btn btn-light me-2 mb-4'>Clear</button>
        <button className='btn btn-success mb-4'>Search</button>
      </form>    

      <div>{error}</div>

      <div className='row'>
        {plants.map(plant => 
          <div key={plant.id} className='col' >
            
            {/* https://stackoverflow.com/questions/40108298/react-get-object-inside-another-object */}
            <img src={plant.default_image && plant.default_image.thumbnail ? plant.default_image.thumbnail : noImage} className='rounded mb-1'/>
            <p className='mb-1'><strong>{plant.common_name}</strong></p>
            <p className='mb-5'><em>{plant.scientific_name}</em></p>
          </div>)}
      </div>

    </div>
  )
}

export default App
