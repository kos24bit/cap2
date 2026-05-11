const express = require("express")
const router = express.Router()

let ratings = []
let ratingId = 1

// Add rating
router.post("/add", (req, res) => {
  const { studentId, courseId, stars } = req.body

  if (stars < 1 || stars > 5) {
    return res.status(400).json({ message: "Stars must be between 1 and 5" })
  }

  const rating = {
    id: ratingId++,
    studentId,
    courseId,
    stars
  }

  ratings.push(rating)

  res.json(rating)
})

// Get ratings for a course
router.get("/course/:courseId", (req, res) => {
  const courseId = parseInt(req.params.courseId)

  const courseRatings = ratings.filter(r => r.courseId === courseId)

  res.json(courseRatings)
})

// Get average rating
router.get("/course/:courseId/average", (req, res) => {
  const courseId = parseInt(req.params.courseId)

  const courseRatings = ratings.filter(r => r.courseId === courseId)

  if (courseRatings.length === 0) {
    return res.json({ average: 0 })
  }

  const avg =
    courseRatings.reduce((sum, r) => sum + r.stars, 0) /
    courseRatings.length

  res.json({ average: avg })
})

module.exports = router