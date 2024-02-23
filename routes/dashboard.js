//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.use('/student', require('./student')); //Routes for students
router.use('/interview', require('./interview')); //Routes for interviews
router.get('/job_listings', dashboardController.listinngs); //Get Job Listings page

module.exports = router;