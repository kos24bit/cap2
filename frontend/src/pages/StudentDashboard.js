import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {

  const [courses, setCourses] = useState([]);
  const [ratings, setRatings] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/access/student/${user._id}`
      );

      setCourses(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleRatingChange = (courseId, value) => {

    setRatings({
      ...ratings,
      [courseId]: value
    });

  };

  const submitRating = async (courseId) => {

    try {

      await axios.post("http://localhost:5000/api/ratings", {
        student: user._id,
        course: courseId,
        rating: ratings[courseId]
      });

      alert("Rating submitted!");

    } catch (error) {

      console.error(error);
      alert("Error submitting rating");

    }

  };

  return (

    <div>

      <h2>My Courses</h2>

      {courses.length === 0 && (
        <p>You are not enrolled in any courses yet.</p>
      )}

      {courses.map((course) => (

        <div
          key={course._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{course.title}</h3>

          <p>{course.description}</p>

          <div style={{ marginTop: "10px" }}>

            <select
              value={ratings[course._id] || ""}
              onChange={(e) =>
                handleRatingChange(course._id, e.target.value)
              }
            >
              <option value="">Rate course</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => submitRating(course._id)}
            >
              Submit Rating
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}

export default StudentDashboard;