import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (

    <div className="navbar">

      <Link to="/courses">Courses</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && user.role === "instructor" && (
        <Link to="/instructor/requests">Instructor Dashboard</Link>
      )}

      {user && user.role === "admin" && (
        <Link to="/admin">Admin Dashboard</Link>
      )}

      {user && (
        <button onClick={logout}>
          Logout
        </button>
      )}

    </div>

  );

}

export default Navbar;
