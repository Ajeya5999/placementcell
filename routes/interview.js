//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const interviewController = require('../controllers/interview_controller');

router.get('/', interviewController.interviews); //Get Interviews page
router.post('/add', interviewController.addInterview); //Adding interview to the list
router.get('/currInterview/:id', interviewController.showInterview); //Getting the perticular interview
router.post('/update/:id', interviewController.updateInterview); //Updating the perticular interview
router.post('/deleteStudent/:id', interviewController.removeStudent); //Removing student from the perticular interview
router.post('/delete/:id', interviewController.deleteInterview); //Deletes the perticular interview 

module.exports = router;