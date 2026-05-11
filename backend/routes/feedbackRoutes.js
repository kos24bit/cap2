const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");


// Add feedback
router.post("/add", async (req,res)=>{

    const {studentId,courseId,rating,comment} = req.body;

    try{

        const feedback = new Feedback({
            studentId,
            courseId,
            rating,
            comment
        });

        await feedback.save();

        res.json({message:"Feedback submitted"});

    }catch(err){
        res.status(500).json({error:err.message});
    }

});


// Get feedback for a course
router.get("/:courseId", async (req,res)=>{

    try{

        const feedbacks = await Feedback.find({
            courseId: req.params.courseId
        });

        res.json(feedbacks);

    }catch(err){
        res.status(500).json({error:err.message});
    }

});


// Get average rating for a course
router.get("/average/:courseId", async (req,res)=>{

    try{

        const result = await Feedback.aggregate([
            {
                $match: { courseId: req.params.courseId }
            },
            {
                $group:{
                    _id:"$courseId",
                    averageRating:{$avg:"$rating"},
                    totalReviews:{$sum:1}
                }
            }
        ]);

        if(result.length === 0){
            return res.json({
                courseId:req.params.courseId,
                averageRating:0,
                totalReviews:0
            });
        }

        res.json(result[0]);

    }catch(err){
        res.status(500).json({error:err.message});
    }

});

module.exports = router;