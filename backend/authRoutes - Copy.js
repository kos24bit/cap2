const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req,res)=>{
    const {name,email,password,role} = req.body;

    const hashed = await bcrypt.hash(password,10);

    const user = new User({
        name,
        email,
        password: hashed,
        role
    });

    await user.save();

    res.json({message:"User registered"});
});

router.post("/login", async (req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(password,user.password);

    if(!valid) return res.status(400).json("Invalid password");

    res.json(user);
});

module.exports = router;