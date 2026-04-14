const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//chat route
router.post("/", auth, async (req, res)=>{
  try{
    const {message}= req.body;

    if(!message){
      return res.status(400).json({message:"Message is required"});
    }

    //for now just echoing back(will add AI later)
    const reply= "You said: " + message;

    res.status(200).json({reply});
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
});

module.exports = router;
