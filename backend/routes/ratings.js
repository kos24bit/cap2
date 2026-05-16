const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");

router.post("/", async (req, res) => {

  try {

    const { student, course, rating } = req.body;

    const newRating = new Rating({
      student,
      course,
      rating
    });

    const savedRating = await newRating.save();

    res.status(201).json(savedRating);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});


// Get average rating for a course

router.get("/course/:courseId", async (req, res) => {

  try {

    const ratings = await Rating.find({ course: req.params.courseId });

    const total = ratings.length;

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);

    const average = total > 0 ? sum / total : 0;

    res.json({
      average,
      total
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});


module.exports = router;