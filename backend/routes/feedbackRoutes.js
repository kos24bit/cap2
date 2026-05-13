const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");


// Add feedback
router.post("/add", async (req, res) => {

    const { student, course, rating, comment } = req.body;

    try {

        const feedback = new Feedback({
            student,
            course,
            rating,
            comment
        });

        await feedback.save();

        res.json({ message: "Feedback submitted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// Get feedback for a course
router.get("/:courseId", async (req, res) => {

    try {

        const feedbacks = await Feedback.find({
            course: req.params.courseId
        }).populate("student", "name email");

        res.json(feedbacks);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});


// Get average rating for a course
router.get("/average/:courseId", async (req, res) => {

    try {

        const result = await Feedback.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(req.params.courseId)
                }
            },
            {
                $group: {
                    _id: "$course",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        if (result.length === 0) {
            return res.json({
                courseId: req.params.courseId,
                averageRating: 0,
                totalReviews: 0
            });
        }

        res.json(result[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;