//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const studentController = require('../controllers/student_controller');

router.post('/add', studentController.addStudent); //Adding student to the list

module.exports = router;