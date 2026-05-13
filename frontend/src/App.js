import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import InstructorDashboard from "./pages/InstructorDashboard";

import InstructorRequests from "./pages/InstructorRequests";
import AdminRequests from "./pages/AdminRequests";

function App() {

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Courses />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={<Courses />} />
		
		<Route path="/instructor/requests" element={<InstructorRequests />} />

		<Route path="/admin/requests" element={<AdminRequests />} />

        <Route
          path="/instructor"
          element={<InstructorDashboard />}
        />

      </Routes>

    </Router>
  );

}

export default App;