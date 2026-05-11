import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <div style={{
      backgroundColor: "#222",
      padding: "10px"
    }}>

      <Link style={linkStyle} to="/courses">Courses</Link>

      <Link style={linkStyle} to="/request-course">Request Course</Link>

      <Link style={linkStyle} to="/feedback">Feedback</Link>

      <Link style={linkStyle} to="/instructor">Instructor Dashboard</Link>

      <Link style={linkStyle} to="/login">Login</Link>

      <Link style={linkStyle} to="/register">Register</Link>

    </div>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Navbar;