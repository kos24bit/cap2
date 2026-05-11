const express = require("express");
const router = express.Router();

const Rating = require("../models/Rating");
const Course = require("../models/Course");


// ===============================
// Add Rating (1–5 stars)
// ===============================
router.post("/add", async (req, res) => {

    try {

        const { studentId, courseId, stars } = req.body;

        const rating = new Rating({
            studentId,
            courseId,
            stars
        });

        await rating.save();

        // Calculate new average rating
        const ratings = await Rating.find({ courseId });

        const total = ratings.reduce((sum, r) => sum + r.stars, 0);
        const average = total / ratings.length;

        res.json({
            message: "Rating added",
            averageRating: average
        });

    } catch (error) {
        res.status(500).json(error);
    }

});


// ===============================
// Get ratings for a course
// ===============================
router.get("/course/:courseId", async (req, res) => {

    try {

        const ratings = await Rating.find({
            courseId: req.params.courseId
        });

        const total = ratings.reduce((sum, r) => sum + r.stars, 0);

        const average = ratings.length > 0
            ? total / ratings.length
            : 0;

        res.json({
            totalRatings: ratings.length,
            averageRating: average,
            ratings
        });

    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;