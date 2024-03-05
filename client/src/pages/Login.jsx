import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        timeout: 10000 // Timeout after 10 seconds
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in local storage
        navigate(`/favourites`);
      }
    } catch (error) {
      console.error('Error during login:', error); // Log the error to the console
      alert(error.message); // Display the error message to the user
    }
  };
  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.setItem('token', data.token); // Store token in local storage
  //       navigate(`/catalog`);
  //       //window.location.href = `/user/${data.user_id}`; // Redirect to user's page
  //     } else {
  //       console.error(data.message); // Log the error to the console
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error); // Log the error to the console
  //   }
  // };

  const requestData = async () => {
    try {
      const response = await fetch("/api/auth/profile", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token") // Corrected the authorization header format
        }
      });
      const data = await response.json(); // Parse response JSON
      console.log(data.message); // Log the message from the response
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to login page
  };

  const handleHome = () => {
    navigate('/');  // Redirect to home page
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <button onClick={handleHome}>Home</button> {/* Home button */}
    </div>
  );
};

export default Login;