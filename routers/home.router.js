const express = require('express');
const router = express.Router();
const courseController = require('../controllers/home.controller');
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddelware= require('../middlewares/auth.user.middleware');
router
  .route("/")
  .get(asyncMiddleware(authMiddelware), asyncMiddleware(courseController.getAllCourse))



module.exports= router;