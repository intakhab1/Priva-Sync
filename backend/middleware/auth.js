const jwt = require("jsonwebtoken");

//middleware to check if user is logged in
const auth= (req, res, next)=>{
  try{
    const token= req.headers.authorization?.split(" ")[1];

    if(!token){
      return res.status(401).json({message:"No token provided"});
    }

    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    req.userId= decoded.id;
    next();
  }catch(error){
    res.status(401).json({message:"Invalid token"});
  }
};

module.exports= auth;
