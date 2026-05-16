import React, { useEffect, useState } from "react";
import axios from "axios";

function InstructorDashboard() {

  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [ratings, setRatings] = useState({}); // ⭐ store ratings per course

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  // ===============================
  // Load Instructor Courses
  // ===============================
  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/courses/instructor/" + user._id,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(res.data);

      // ⭐ fetch rating for each course
      res.data.forEach(course => {
        fetchRating(course._id);
      });

    } catch (error) {

      console.error("Error loading courses:", error);

    }

  };


  // ===============================
  // Fetch rating for course
  // ===============================
  const fetchRating = async (courseId) => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/ratings/course/" + courseId
      );

      setRatings(prev => ({
        ...prev,
        [courseId]: res.data
      }));

    } catch (error) {

      console.error("Error loading rating:", error);

    }

  };


  // ===============================
  // Load Course Requests
  // ===============================
  const fetchRequests = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/requests/instructor/" + user._id,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRequests(res.data);

    } catch (error) {

      console.error("Error loading requests:", error);

    }

  };


  // ===============================
  // Approve Request
  // ===============================
  const approveRequest = async (id) => {

    try {

      await axios.put(
        "http://localhost:5000/api/requests/" + id + "/approve",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Request approved");

      fetchRequests();

    } catch (error) {

      console.error("Approve error:", error);

    }

  };


  // ===============================
  // Reject Request
  // ===============================
  const rejectRequest = async (id) => {

    try {

      await axios.put(
        "http://localhost:5000/api/requests/" + id + "/reject",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Request rejected");

      fetchRequests();

    } catch (error) {

      console.error("Reject error:", error);

    }

  };


  // ===============================
  // Load data on page load
  // ===============================
  useEffect(() => {

    fetchCourses();
    fetchRequests();

  }, []);

const renderStars = (avg) => {

  if (!avg) return "☆☆☆☆☆";

  const fullStars = Math.floor(avg);
  const emptyStars = 5 - fullStars;

  return "★".repeat(fullStars) + "☆".repeat(emptyStars);

};

  return (
    <div>

      <h2>Instructor Dashboard</h2>

      {/* ===============================
          Instructor Courses
      =============================== */}

      <button onClick={()=>window.location.href="/create-course"}>
        Create Course
      </button>

      <button onClick={()=>window.location.href="/instructor/requests"}>
        Student Requests
      </button>


      <h3>Your Courses</h3>

      {courses.length === 0 && (
        <p>No courses created yet</p>
      )}

      {courses.map((course) => (

        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h4>{course.title}</h4>
          <p>{course.description}</p>

          {/* ⭐ Course Rating */}
			<p>
			  <strong>Average Rating:</strong>{" "}
			  {ratings[course._id] ? (
				<>
				  {renderStars(ratings[course._id].average)} 
				  {" "}({ratings[course._id].average.toFixed(1)} / 5 from {ratings[course._id].total} ratings)
				</>
			  ) : (
				"No ratings yet"
			  )}
			</p>

        </div>

      ))}


      {/* ===============================
          Student Requests
      =============================== */}

      <h3>Student Requests</h3>

      {requests.length === 0 && (
        <p>No requests</p>
      )}

      {requests.map((req) => (

        <div
          key={req._id}
          style={{
            border: "1px solid #aaa",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <p>
            <strong>Student:</strong> {req.user?.name}
          </p>

          <p>
            <strong>Course:</strong> {req.course?.title}
          </p>

          <p>
            <strong>Status:</strong> {req.status}
          </p>

          {req.status === "pending" && (
            <>
              <button
                onClick={() => approveRequest(req._id)}
                style={{ marginRight: "10px" }}
              >
                Approve
              </button>

              <button
                onClick={() => rejectRequest(req._id)}
              >
                Reject
              </button>
            </>
          )}

        </div>

      ))}

    </div>
  );
}

export default InstructorDashboard;