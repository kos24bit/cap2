const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashed = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password: hashed,
            role
        });

        await user.save();

        res.json({message:"User registered"});
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
});

router.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not found"});

        const valid = await bcrypt.compare(password,user.password);
        if(!valid) return res.status(400).json({message:"Invalid password"});

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        });

    }catch(err){
        res.status(500).json({message:"Server error"});
    }
});

module.exports = router;