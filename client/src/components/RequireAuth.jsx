import React from 'react';
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../pages/useAuth"; // Assuming useAuth is in the same folder

const RequireAuth = ({ children }) => {
    const { isLoggedIn } = useAuth();
    let location = useLocation();
    const navigate = useNavigate(); // Add this line to get the navigate function

    if (!isLoggedIn) {
        // Use navigate function to redirect
        navigate('/login');
        // Use Navigate component to render the redirect
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;