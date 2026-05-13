import React from "react";
import axios from "axios";

function CourseRequestButton({ courseId }) {

  const requestCourse = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/requests/request", {
        userId: user._id,
        courseId: courseId
      });

      alert("Course request sent!");

    } catch (error) {

      console.error(error);
      alert("Request failed");

    }
  };

  return (
    <button onClick={requestCourse}>
      Request Access
    </button>
  );
}

export default CourseRequestButton;