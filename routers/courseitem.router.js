const express = require('express');
const router = express.Router();
const courseItemController = require('../controllers/courseitem.controller');
const asyncMiddelware= require('../middlewares/async.middleware')
const authMiddelware= require('../middlewares/auth.admin.middleware')
const authUserMiddelware= require('../middlewares/auth.user.middleware')

router
  .route('/')
  .post(asyncMiddelware(authMiddelware), asyncMiddelware(courseItemController.create));

router
  .route('/:id')
  .get(asyncMiddelware(authUserMiddelware), asyncMiddelware(courseItemController.getAllCourseItem))
router
  .route('/:idCourse/:idCourseItem')  
  .delete(asyncMiddelware(authMiddelware), asyncMiddelware(courseItemController.deleteCourseItem));


  module.exports= router