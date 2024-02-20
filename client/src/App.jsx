// require("dotenv").config();
import { useState } from 'react'

import './App.css'

// const API_KEY = process.env.API_KEY

function App() {
  
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
    </>
  )
}

export default App
