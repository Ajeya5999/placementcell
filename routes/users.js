//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const usersController = require('../controllers/users_controller');

// Setting User Routes

router.get('/sign-up', usersController.signUp); // Load Sign-up Page
router.post('/create', usersController.create); // Make user account
router.get('/sign-in', usersController.signIn); // Load Sign-in Page

module.exports = router;