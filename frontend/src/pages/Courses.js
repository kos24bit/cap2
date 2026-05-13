// src/pages/Courses.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseRequestButton from "../components/CourseRequestButton";

function Courses() {

  const [courses, setCourses] = useState([]);

  // ===============================
  // Load all courses
  // ===============================
  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/courses"
        );

        setCourses(res.data);

      } catch (error) {

        console.error("Error loading courses:", error);

      }

    };

    fetchCourses();

  }, []);


  return (
    <div>

      <h2>Courses</h2>

      {courses.length === 0 && (
        <p>No courses available</p>
      )}

      {courses.map((course) => (

		<div key={course._id} className="card">

          <h3>{course.title}</h3>

          <p>{course.description}</p>

          {/* Request button component */}
          <CourseRequestButton courseId={course._id} />

        </div>

      ))}

    </div>
  );
}

export default Courses;