const configuration = require("../configs/configuration");

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");


module.exports = async (req, res, next) => {
  
  const token = req.cookies?.token;

  if (!token){
    res.redirect("/")
  }

  const decode = jwt.verify(token, configuration.JWT_SECRET);

  const user = await User.findById(decode._id);

  if (!user) {
    res.redirect("/")
  }

  req.user = user;
  next();
};