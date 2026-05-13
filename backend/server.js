const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express() ;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

const requestRoutes = require("./routes/requestRoutes");
app.use("/api/requests", requestRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

const accessRoutes = require("./routes/accessRoutes");
app.use("/api/access", accessRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/lmsdb")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
    res.send("LMS API Running");
});

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});