import React, { useState, useEffect } from 'react';
import RequireAuth from '../components/RequireAuth';

const Favorites = () => {
  const [favoritePlants, setFavoritePlants] = useState([]);

  useEffect(() => {
    const fetchFavoritePlants = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await fetch('/api/auth/favourites', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request headers
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFavoritePlants(data.plants.data); // Set the fetched plants to state
        } else {
          console.error(data.message); // Log error message if request fails
        }
      } catch (error) {
        console.error('Error fetching favorite plants:', error); // Log error if fetch fails
      }
    };

    fetchFavoritePlants(); // Call the fetch function when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const noImage =
  'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png';

return (
  <RequireAuth>
    <div>
      <h2>Favorites</h2>
      <div className="row">
        {favoritePlants.map((plant) => (
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
    </div>
  </RequireAuth>
);
};

export default Favorites;
