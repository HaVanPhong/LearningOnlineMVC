const configuration = require("../configs/configuration");

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");


module.exports = async (req, res, next) => {
  
  const token = req.cookies?.token;
  console.log("token:::: ", token);
  if (!token){
    res.redirect("/")
  }

  const decode = jwt.verify(token, configuration.JWT_SECRET);

  const user = await User.findById(decode._id);
  if (!user ||user?.role!=="Admin") {
    res.redirect("/")
  }else {
    req.user = user;
    next();

  }

};