//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const homeController = require('../controllers/home_controller');

console.log("Router has been loaded");

router.get('/', homeController.student); 
router.use('/users', require('./users'));
// router.all('*', homeController.notFound); //For Non Existant Routes  

module.exports = router;