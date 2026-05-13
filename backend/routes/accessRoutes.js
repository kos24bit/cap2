const express = require("express");
const router = express.Router();

const Access = require("../models/Access");
const Course = require("../models/Course");

// =============================
// Student requests access
// =============================
router.post("/request", async (req, res) => {
  try {

    const { userId, courseId } = req.body;

    const existing = await Access.findOne({
      user: userId,
      course: courseId
    });

    if (existing) {
      return res.status(400).json({ message: "Already requested/enrolled" });
    }

    const access = new Access({
      user: userId,
      course: courseId,
      status: "pending"
    });

    await access.save();

    res.json({ message: "Request submitted", access });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =============================
// Instructor/Admin approves
// =============================
router.put("/approve/:id", async (req, res) => {
  try {

    const access = await Access.findById(req.params.id);

    if (!access) {
      return res.status(404).json({ message: "Not found" });
    }

    access.status = "approved";
    await access.save();

    res.json({ message: "Approved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =============================
// Student enrolled courses
// =============================
router.get("/student/:studentId", async (req, res) => {

  try {

    const accesses = await Access.find({
      user: req.params.studentId,
      status: "approved"
    }).populate("course");

    const courses = accesses.map(a => a.course);

    res.json(courses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;