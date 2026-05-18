import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";


function StudentDashboard() {

  const [courses, setCourses] = useState([]);
  const [ratings, setRatings] = useState({});
  const [myRatings, setMyRatings] = useState({});
  
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

      res.data.forEach(course => {
        fetchRatings(course._id);
      });

    } catch (error) {

      console.error(error);

    }

  };

  ///////////////////////////////////////////
  // Fetch ratings for each course
  ///////////////////////////////////////////
  const fetchRatings = async (courseId) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/ratings/course/${courseId}`
      );

      setRatings(prev => ({
        ...prev,
        [courseId]: res.data
      }));

    } catch (error) {

      console.error(error);

    }

  };

///////////////////////////////
//Render Starts
///////////////////////////////
const renderStars = (avg) => {

  const rounded = Math.round(avg);

  return (
    <>
      {[1,2,3,4,5].map((i) => (
        <FaStar
          key={i}
          color={i <= rounded ? "orange" : "grey"}
          style={{marginRight:"2px"}}
        />
      ))}
    </>
  );

};

/*old func... 
  ///////////////////////////////////////////
  // Render star rating
  ///////////////////////////////////////////
  const renderStars = (avg) => {

    const rounded = Math.round(avg);

    let stars = "";

    for (let i = 0; i < 5; i++) {
      stars += i < rounded ? "⭐" : "☆";
    }

    return stars;

  };
*/

  ///////////////////////////////////////////
  // rate 
  ///////////////////////////////////////////
const submitRating = async (courseId) => {

  try {

    await axios.post(
      "http://localhost:5000/api/ratings",
      {
        student: user._id,
        course: courseId,
        rating: myRatings[courseId]
      }
    );

    alert("Rating submitted");

    fetchRatings(courseId);

  } catch (error) {

    console.error(error);

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

          {ratings[course._id] && (
            <p>
              Rating:
              <span style={{ color: "#f5b50a", marginLeft: "5px" }}>
                {renderStars(ratings[course._id].average)}
              </span>
              ({ratings[course._id].total} ratings)
            </p>
          )}
		  
			<div style={{marginTop:"10px"}}>

			  <select
				value={myRatings[course._id] || ""}
				onChange={(e) =>
				  setMyRatings({
					...myRatings,
					[course._id]: e.target.value
				  })
				}
			  >
				<option value="">Rate course</option>
				<option value="1">1 ⭐</option>
				<option value="2">2 ⭐</option>
				<option value="3">3 ⭐</option>
				<option value="4">4 ⭐</option>
				<option value="5">5 ⭐</option>
			  </select>

			  <button
				style={{marginLeft:"10px"}}
				onClick={() => submitRating(course._id)}
			  >
				Submit Rating
			  </button>

			</div>		  

          {course.material && (
            <div style={{marginTop:"10px"}}>
              <a
                href={`http://localhost:5000/${course.material}`}
                target="_blank"
                rel="noreferrer"
              >
                Download Course Material
              </a>
            </div>
          )}

        </div>

      ))}

    </div>

  );

}

export default StudentDashboard;