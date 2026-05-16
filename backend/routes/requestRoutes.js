const express = require("express");
const router = express.Router();

const CourseRequest = require("../models/CourseRequest");
const Course = require("../models/Course");
const Access = require("../models/Access");

/* ========================
   STUDENT REQUEST COURSE
========================= */

router.post("/request", async (req, res) => {

    try {

        const { userId, courseId } = req.body;

        const request = new CourseRequest({
            user: userId,
            course: courseId,
            status: "pending"
        });

        await request.save();

        res.json({ message: "Course access requested" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


/* =========================
   GET ALL REQUESTS (ADMIN)
========================= */

router.get("/", async (req, res) => {

    try {

        const requests = await CourseRequest
            .find()
            .populate("user", "name email")
            .populate("course", "title description");

        res.json(requests);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


/* =========================
   GET REQUESTS (Instructor)
========================= */

router.get("/instructor/:instructorId", async (req, res) => {

    try {

        const courses = await Course.find({
            instructor: req.params.instructorId
        });

        const courseIds = courses.map(c => c._id);

        const requests = await CourseRequest.find({
            course: { $in: courseIds }
        }).populate("user course");

        res.json(requests);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});


/* =========================
   APPROVE REQUEST
========================= */

router.put("/:id/approve", async (req, res) => {

  try {

    const request = await CourseRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "approved";
    await request.save();

    // create course access
    const access = new Access({
      user: request.user,
      course: request.course
    });

    await access.save();

    res.json({ message: "Request approved and access granted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

/* =========================
   REJECT REQUEST
========================= */

router.put("/:id/reject", async (req, res) => {

    try {

        const request = await CourseRequest.findById(req.params.id);

        request.status = "rejected";

        await request.save();

        res.json({ message: "Request rejected" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;