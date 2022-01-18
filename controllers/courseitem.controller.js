const CourseItem= require('../models/courseitem.model');
const Course= require('../models/course.model');

module.exports.create= async(req, res)=>{
  let body= req.body;
  console.log(body);
  await CourseItem.create(body);
  res.redirect('/course');
}

module.exports.getAllCourseItem= async(req, res)=>{
  console.log(req.params.id);
  let courseItems= await CourseItem.find({
    course: req.params.id
  }).populate('course');
  console.log(courseItems);
  let coure= await Course.findById(req.params.id);

  res.render("../views/courses/getAllCourseItem.ejs", {courseId: req.params.id, courseItems: courseItems, courseName: coure.name, user: req.user, hiden: true})
}

module.exports.deleteCourseItem= async(req, res)=>{
  // res.json({
  //   idC: req.params.idCourse,
  //   idI: req.params.idCourseItem
  // })
  await CourseItem.findByIdAndDelete(req.params.idCourseItem)
  res.redirect('/courseitem/'+req.params.idCourse)
}