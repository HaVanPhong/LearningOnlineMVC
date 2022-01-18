const Course= require('../models/course.model')
const jwt= require('jsonwebtoken');
const User= require('../models/user.model')
const configuration= require('../configs/configuration')
const mongooseUtil= require('../util/mongoose.util')
module.exports.getAllCourse=async (req, res)=>{
  let token = req?.cookies?.token;
  let user = jwt.decode(token, configuration.JWT_SECRET);
  let course= await Course.find();
  console.log(course);
  res.render("layouts/main", {user: user, hiden: false, course: mongooseUtil.multipleMongooseToObject(course)})
}
