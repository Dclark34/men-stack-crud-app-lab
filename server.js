//Dependancies
const dotenv = require('dotenv'); //require package
dotenv.config(); // load environment variables
const PORT = process.env.PORT //call port
const express = require('express');
const app = express();//how we show our routes using express. (aka app.get is initialized from this)
const mongoose = require('mongoose');







//Connect to DB:
mongoose.connect(process.env.MONGODB_URI);
//test connection
mongoose.connection.on("connected",() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.` )
});

//MODEL IMPORT
const Car = require('./models/valleyAuto.js');


//MIDDLEWARE:
app.use(express.urlencoded({ extended : false})); //parses incoming bodies, extracts it from form. Organizes it in JS object.


//GET INDEX ROUTE
app.get('/', async (req, res) => {
    res.render("index.ejs")
});


//NEW ROUTE (GET FORM)
app.get('/cars/new', async(req, res) => {
    res.render("./cars/new.ejs")
});
//NEW ROUTE pt 2 (THE CREATE ROUTE: POST)














//Server Listener:
app.listen(PORT, () => {
    console.log("Server is Listening on port 3000")
});