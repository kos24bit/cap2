// src/pages/Courses.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseRequestButton from "../components/CourseRequestButton";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [ratings, setRatings] = useState({});
  const [enrollments, setEnrollments] = useState({});
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
        fetchRatings(res.data);

        res.data.forEach(course => {
           fetchEnrollmentCount(course._id);
        });		
		

      } catch (error) {

        console.error("Error loading courses:", error);

      }

    };

    fetchCourses();

	/////////////
	//Fetch ratings in public courses page
	/////////////
	const fetchRatings = async (courses) => {

	  const ratingData = {};

	  for (const course of courses) {

		try {

		  const res = await axios.get(
			`http://localhost:5000/api/ratings/course/${course._id}`
		  );

		  ratingData[course._id] = res.data;

		} catch (error) {

		  ratingData[course._id] = { average: 0, total: 0 };

		}

	  }

	  setRatings(ratingData);

	};	
	
	

  }, []);

	const renderStars = (avg) => {

	  const fullStars = Math.floor(avg);
	  const emptyStars = 5 - fullStars;

	  return "★".repeat(fullStars) + "☆".repeat(emptyStars);

	};

//fetch enrollment cout [no need for login]
const fetchEnrollmentCount = async (courseId) => {

  try {

    const res = await axios.get(
      `http://localhost:5000/api/access/count/${courseId}`
    );

    setEnrollments(prev => ({
      ...prev,
      [courseId]: res.data.total
    }));

  } catch (error) {
    console.error(error);
  }

};


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
		  
			<p>
			  <strong>Rating:</strong>{" "}
			  {ratings[course._id] ? (
				<>
					<span style={{ color: "gold" }}>
					  {renderStars(ratings[course._id].average)}
					</span>
				  {" "}({ratings[course._id].average.toFixed(1)} / 5 from {ratings[course._id].total} ratings)
				</>
			  ) : (
				"No ratings yet"
			  )}
			</p>
			{enrollments[course._id] !== undefined && (
			  <p>
				Students Enrolled: {enrollments[course._id]}
			  </p>
			)}
          {/* Request button component */}
          <CourseRequestButton courseId={course._id} />

        </div>

      ))}

    </div>
  );
}

export default Courses;