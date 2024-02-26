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

  const [page, setPage] = useState({
    pageNumber: 1,
    hasNext: true,
    hasPrevious: false,
  });

  const noImage =
    "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";

  useEffect(() => {
    const queryParams = readSearchParams();
    setParams(queryParams);
    getPlants(queryParams);
  }, []);

  function readSearchParams() {
    const result = {};

    for (const entry of searchParams.entries()) {
      result[entry[0]] = entry[1];
    }
    return result;
  }

  async function getPlants(queryParams) {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const plants = await apiClient.searchPlants(queryParams);
      setPlants(plants.data);
      setPage({
        pageNumber: plants.page_number,
        hasNext: plants.has_next,
        hasPrevious: plants.has_previous,
      });
    } catch (error) {
      setError(error);
    }
  }

  function handleFormSearch(e) {
    e.preventDefault();
    const queryParams = { ...params, page: 1 };
    setSearchParams(queryParams);
    getPlants(queryParams);
  }

  function clearParams(e) {
    e.preventDefault();
    setParams({});
  }

  function navigatePage(newPage) {
    const queryParams = { ...readSearchParams(), page: newPage };
    setParams(queryParams);
    setSearchParams(queryParams);
    getPlants(queryParams);
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
              className="btn btn-light me-2"
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

      <Pagination page={page} updatePageNumber={navigatePage} />
    </div>
  );
}
