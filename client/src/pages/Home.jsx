import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link to="/register">Sign Up</Link>
      <Link to="/login">Log In</Link>
      <Link to="/catalog">Catalog</Link>
    </div>
  );
}
