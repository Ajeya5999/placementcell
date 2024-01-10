//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const usersController = require('../controllers/users_controller');

// Setting User Routes

router.get('/sign-up', usersController.signUp); 
router.post('/create', usersController.create);

module.exports = router;