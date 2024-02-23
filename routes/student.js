//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const studentController = require('../controllers/student_controller');

router.get('/', studentController.student); //Get Students page
router.post('/add', studentController.addStudent); //Adding student to the list
router.get('/currStudent/:id', studentController.showStudent); //Show the student that is clicked on
router.post('/update/:id', studentController.updateStudent); //Update the perticular student
router.post('/delete/:id', studentController.deleteStudent); //delete the perticular student


module.exports = router;