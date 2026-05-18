import React, { useState } from "react";
import axios from "axios";

function CreateCourse() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const createCourse = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("instructor", user._id);

    if (material) {
      formData.append("material", material);
    }

    try {

      await axios.post(
        "http://localhost:5000/api/courses/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Course created");

      setTitle("");
      setDescription("");
      setMaterial(null);

    } catch (error) {

      console.error(error);

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

        <div>
          <label>Upload Course Material</label>
          <br/>
          <input
            type="file"
            onChange={(e) => setMaterial(e.target.files[0])}
          />
        </div>

        <br/><br/>

        <button type="submit">
          Create Course
        </button>

      </form>

    </div>

  );
}

export default CreateCourse;