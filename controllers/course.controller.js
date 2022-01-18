const Course = require("../models/course.model");
const User = require("../models/user.model");
const configuration = require("../configs/configuration");
const mongooseUtil = require("../util/mongoose.util");

module.exports.createCourse = async (req, res) => {
  try {
    let course = await Course.create(req.body);
    if (course) {
      res.redirect('/home')
    }


  } catch (error) {
    res.send("OOPSSSS..... \n"+error.message);
  }
};

module.exports.getAllCourse= async (req, res)=>{
  let course= await Course.find();
  res.render('../views/courses/getAllCourse.ejs', {user: req.user, hiden: true, course: mongooseUtil.multipleMongooseToObject(course)})
}

module.exports.deleteCourse= async(req, res)=>{
  await Course.deleteOne({_id: req.params.id});
  res.redirect('/course');
}
module.exports.updateCourse= async(req, res)=>{
  await Course.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/course');
}

module.exports.getFormAddVideo= async(req, res)=>{
  let course= await Course.findById(req.params.id);
  res.render('../views/partials/dialogaddvideo.ejs', {course: course })
} 

module.exports.getFormEditCourse= async(req, res)=>{
  let course= await Course.findById(req.params.id);
  res.render('../views/partials/editcourseform.ejs', {course: mongooseUtil.mongooseToObject(course)})
} 