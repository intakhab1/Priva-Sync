const express = require("express");
const router = express.Router();
const auth= require("../middleware/auth");
const {GoogleGenerativeAI}= require("@google/generative-ai");
const Message= require("../models/Message");

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//chat route
router.post("/", auth, async (req, res)=>{
  try{
    const {message}= req.body;

    if(!message){
      return res.status(400).json({message:"Message is required"});
    }

    //gemini api
    const model= genAI.getGenerativeModel({model:"gemini-1.5-flash"});
    const result= await model.generateContent(message);
    const reply = result.response.text();

    //save chat to db
    const newMessage= new Message({
      userId: req.userId,
      userMessage: message,
      botReply: reply
    });
    await newMessage.save();

    res.status(200).json({reply});
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
});

//get chat history
router.get("/history", auth, async (req, res)=>{
  try{
    const chats= await Message.find({userId: req.userId}).sort({createdAt: 1});
    res.status(200).json({chats});
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
  }
});

module.exports = router;
