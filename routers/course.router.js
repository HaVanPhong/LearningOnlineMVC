const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const asyncMiddelware= require('../middlewares/async.middleware')
const authMiddelware= require('../middlewares/auth.admin.middleware')

router
  .route("/")
  .get(asyncMiddelware(authMiddelware), asyncMiddelware(courseController.getAllCourse))


router
  .route("/:id")
  .get(asyncMiddelware(authMiddelware), courseController.getFormAddVideo)

router
  .route("/edit/:id")
  .get(asyncMiddelware(authMiddelware), asyncMiddelware(courseController.getFormEditCourse))
  .patch(asyncMiddelware(authMiddelware), asyncMiddelware(courseController.updateCourse))
  .delete(asyncMiddelware(authMiddelware), asyncMiddelware(courseController.deleteCourse));


router
  .route("/create")
  .post(asyncMiddelware(authMiddelware), asyncMiddelware(courseController.createCourse))



module.exports= router;  
