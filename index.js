// Getting Enviroment Variables

require('dotenv').config();

//Setting up Express

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

//Using Mongoose for mongoDB

const db = require('./config/mongoose');

//Using encoding to get data

app.use(express.urlencoded());

//Setting up ejs layouts

const expressLayouts = require('express-ejs-layouts');

//Setting up static assets directory

app.use(express.static("./assets"));

//Setting up ejs and layouts for views

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', './layouts/default');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting up routes

app.use('/', require('./routes/index'));

// Running the server

app.listen(port, function(err){
    (err) ? console.log("Error in running the server:", err) : console.log("Server is running on port:", port);
});