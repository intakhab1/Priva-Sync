const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//signup route
router.post("/signup", async (req, res)=>{
  try{
    const {name, email, password}= req.body;

    //check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: "User already exists" });
    }

    //hashing the password
    const hashedPassword= await bcrypt.hash(password, 10);

    //creating new user
    const newUser= new User({name, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({message: "User created successfully"});
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;
