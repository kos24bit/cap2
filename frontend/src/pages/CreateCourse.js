import React, { useState } from "react";
import axios from "axios";

function CreateCourse() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const createCourse = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/courses",
        {
          title,
          description,
          instructorId: user._id
        }
      );

      alert("Course created successfully");

      window.location.href = "/instructor";

    } catch (error) {

      console.error(error);
      alert("Error creating course");

    }

  };

  return (

    <div>

      <h2>Create Course</h2>

      <form onSubmit={createCourse}>

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />

        <br/><br/>

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
        />

        <br/><br/>

        <button type="submit">
          Create Course
        </button>

      </form>

    </div>

  );
}

export default CreateCourse;