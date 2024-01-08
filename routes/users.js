//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const usersController = require('../controllers/users-controller');

// Setting User Routes

router.get('/sign-up', usersController.signUp); 

module.exports = router;