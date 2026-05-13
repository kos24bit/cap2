const express = require("express");
const router = express.Router();
const Course = require("../models/Course");


// ===============================
// Add a new course
// ===============================
router.post("/add", async (req, res) => {

  const { title, description, instructor } = req.body;

  try {

    const course = new Course({
      title,
      description,
      instructor: instructorId 
    });

    await course.save();

    res.json({ message: "Course added" });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


// ===============================
// Get all courses
// ===============================
router.get("/", async (req, res) => {

  try {

    const courses = await Course.find();

    res.json(courses);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


// ===============================
// Get courses by instructor
// ===============================
router.get("/instructor/:instructorId", async (req, res) => {

  try {

    const courses = await Course.find({
      instructor: req.params.instructorId
    });

    res.json(courses);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// ===============================
// Update a course
// ===============================
router.put("/update/:id", async (req, res) => {

  const { title, description, instructor } = req.body;

  try {

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, instructor },
      { new: true }
    );

    res.json(updatedCourse);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


module.exports = router;