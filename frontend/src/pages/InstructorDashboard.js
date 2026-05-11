import React, { useState } from "react";
import axios from "axios";

function InstructorDashboard() {

  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {

    try {

      // Get instructor info
      const usersRes = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      const instructor = usersRes.data.find(
        (u) => u._id === instructorId
      );

      if (instructor) {
        setInstructorName(instructor.name);
      } else {
        setInstructorName("Unknown Instructor");
      }

      // Get courses
      const coursesRes = await axios.get(
        `http://localhost:5000/api/courses/instructor/${instructorId}`
      );

      setCourses(coursesRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h2>Instructor Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Enter Instructor ID"
          value={instructorId}
          onChange={(e) => setInstructorId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />

        <button onClick={loadCourses}>
          Load My Courses
        </button>

      </div>

      {instructorName && (
        <h3>Instructor: {instructorName}</h3>
      )}

      <h3>Your Courses</h3>

      {courses.length === 0 && <p>No courses found</p>}

      <ul>

        {courses.map((course) => (

          <li key={course._id}>
            <b>{course.title}</b> — {course.description}
          </li>

        ))}

      </ul>

    </div>

  );

}

export default InstructorDashboard;