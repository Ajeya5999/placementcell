//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const interviewController = require('../controllers/interview_controller');

router.get('/', interviewController.interviews); //Get Interviews page
router.post('/add', interviewController.addInterview); //Adding interview to the list

module.exports = router;