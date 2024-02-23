import React from "react";
import { apiClient } from "../apiClient";
import RadioInput from "../components/RadioInput";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Catalog() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const [params, setParams] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPage, setSearchPage] = useState(searchParams.get("page") || 1);

  const [page, setPage] = useState({
    pageNumber: 1,
    hasNext: true,
    hasPrevious: false,
  });

  const noImage =
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";

  useEffect(() => {
    getPlants();
  }, []);

  useEffect(() => {
    const result = {};

    for (const entry of searchParams.entries()) {
      result[entry[0]] = entry[1];
    }

    setParams(result);
  }, [searchParams]);

  // async function getPlants() {
  //   try {
  //     const response = await fetch(`/api/catalog`);
  //     const data = await response.json();
  //     setPlants(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // function updateSearchParams() {}

  // function readSearchParams(then) {
  //   const pageNumber = searchParams.get("page") || 1;
  //   setPage({ ...page, pageNumber }, then);
  // }

  async function getPlants() {
    try {
      const plants = await apiClient.searchPlants(params /*page*/);
      setPlants(plants.data);
    } catch (error) {
      setError(error);
    }
  }

  function handleFormSearch(e) {
    e.preventDefault();
    setSearchParams(params);
  }

  function clearParams(e) {
    e.preventDefault();
    // setSearchParams({});
    setParams({});
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

  function handlePageChange(e) {
    e.preventDefault();
    setPage({ ...page, pageNumber: [pageNumber] + 1 });
    console.log(page);
    setSearchPage(page.pageNumber);
    setSearchParams("page", searchPage);
  }

  return (
    <div className="container">
      <div className="row mb-3">
        <h2 className="display-3">Find your favourite plants</h2>
      </div>

      <form className="container">
        <div className="row mb-4">
          <RadioInput value={"indoor"} setParams={setParams} params={params} />
          <RadioInput value={"edible"} setParams={setParams} params={params} />
          <RadioInput
            value={"poisonous"}
            setParams={setParams}
            params={params}
          />
        </div>

        <div className="row mb-5">
          <div className="col-9">
            <input
              onChange={(e) => setParams({ ...params, query: e.target.value })}
              placeholder="Search by name"
              name="query"
              className="form-control"
              value={params.query ? params.query : ""}
            ></input>
          </div>
          <div className="col-3">
            <button
              type="reset"
              onClick={clearParams}
              className="btn btn-light"
            >
              Clear
            </button>
            <button onClick={handleFormSearch} className="btn btn-success">
              Search
            </button>
          </div>
        </div>
      </form>

      <div>{error}</div>

      <div className="row">
        {plants.map((plant) => (
          <div key={plant.id} className="col">
            <Link to={`/catalog/${plant.id}`}>
              <img
                src={plant.thumbnail ? plant.thumbnail : noImage}
                className="rounded mb-1"
              />
            </Link>
            <p className="mb-1">
              <strong>{plant.common_name}</strong>
            </p>
            <p className="mb-5">
              <em>{plant.scientific_name}</em>
            </p>
          </div>
        ))}
      </div>
      <Pagination page={page} />
    </div>
  );
}
