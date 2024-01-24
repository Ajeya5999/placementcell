//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.get('/student', dashboardController.student); //Get Students page
router.get('/interviews', dashboardController.interviews); //Get Interviews page
router.get('/job_listings', dashboardController.listinngs); //Get Job Listings page

module.exports = router;