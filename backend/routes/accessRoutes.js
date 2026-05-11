const express = require("express");
const router = express.Router();

const AccessRequest = require("../models/AccessRequest");
const Course = require("../models/Course");

// =============================
// Student requests course access
// =============================
router.post("/request", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const existing = await AccessRequest.findOne({ userId, courseId });

    if (existing) {
      return res.status(400).json({ message: "Request already exists" });
    }

    const request = new AccessRequest({
      userId,
      courseId,
      status: "pending"
    });

    await request.save();

    res.json({ message: "Access request submitted", request });

  } catch (err) {
    res.status(500).json(err);
  }
});


// =============================
// Instructor gets pending requests
// =============================
router.get("/pending/:instructorId", async (req, res) => {
  try {

    const courses = await Course.find({
      instructor: req.params.instructorId
    });

    const courseIds = courses.map(course => course._id);

    const requests = await AccessRequest.find({
      courseId: { $in: courseIds },
      status: "pending"
    })
      .populate("userId", "name email")
      .populate("courseId", "title");

    res.json(requests);

  } catch (err) {
    res.status(500).json(err);
  }
});


// =============================
// Instructor approves request
// =============================
router.put("/approve/:requestId", async (req, res) => {
  try {

    const request = await AccessRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "approved";
    await request.save();

    res.json({ message: "Request approved" });

  } catch (err) {
    res.status(500).json(err);
  }
});


// =============================
// Instructor rejects request
// =============================
router.put("/reject/:requestId", async (req, res) => {
  try {

    const request = await AccessRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Request rejected" });

  } catch (err) {
    res.status(500).json(err);
  }
});


// Get courses for a specific student
router.get("/student/:studentId", async (req,res)=>{

try{

console.log("Student ID received:", req.params.studentId);

const accesses = await Access.find({
studentId:req.params.studentId,
status:"approved"
}).populate("courseId");

console.log("Access records:", accesses);

const courses = accesses.map(a => a.courseId);

res.json(courses);

}catch(err){

console.log("ERROR:", err);
res.status(500).json({error:err.message});

}

});


module.exports = router;