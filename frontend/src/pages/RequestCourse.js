import React, { useEffect, useState } from "react";
import axios from "axios";

function RequestCourse() {

  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/courses");

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const requestCourse = async (courseId) => {

    try {

      const res = await axios.post("http://localhost:5000/api/requests/request", {
        userId,
        courseId
      });

      setMessage(res.data.message);

    } catch (error) {

      setMessage("Error requesting course");

    }

  };

  return (

    <div>

      <h2>Request Course Access</h2>

      <input
        type="text"
        placeholder="Enter Your User ID"
        value={userId}
        onChange={(e)=>setUserId(e.target.value)}
      />

      <br /><br />

      {courses.map(course => (

        <div key={course._id} style={{border:"1px solid gray", padding:"10px", margin:"10px"}}>

          <h3>{course.title}</h3>

          <p>{course.description}</p>

          <button onClick={()=>requestCourse(course._id)}>
            Request Access
          </button>

        </div>

      ))}

      <p>{message}</p>

    </div>

  );
}

export default RequestCourse;