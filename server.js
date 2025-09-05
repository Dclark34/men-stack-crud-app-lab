//Dependancies
const dotenv = require('dotenv'); //require package
dotenv.config(); // load environment variables
const PORT = process.env.PORT //call port
const express = require('express');
const app = express();//how we show our routes using express. (aka app.get is initialized from this)
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');




//Connect to DB:
mongoose.connect(process.env.MONGODB_URI);
//test connection
mongoose.connection.on("connected",() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.` )
});

//MODEL IMPORT
const Car = require("./models/valleyAuto.js");


//MIDDLEWARE:
app.use(express.urlencoded({ extended : false})); //parses incoming bodies, extracts it from form. Organizes it in JS object.
app.use(methodOverride("_method"));
app.use(morgan("dev"));


//LANDING PAGE (text/index) (1st route)
app.get('/', async (req, res) => {
    res.render("index.ejs")
});

//INDEX ROUTE (Get) (4th route) (all inventory)
app.get('/cars', async (req, res) => {
    const allCars = await Car.find(); //finds all entries in DB and stores in variable.
    console.log(allCars);//test to see if path to db is correct
    res.render("cars/index.ejs", { cars: allCars});
});


//ADD NEW CAR (2 parts. GET and POST in our RESTful routing) (these two will be our C in CRUD)

//THE NEW ROUTE: (GETS FORM) (2nd route)
app.get('/cars/new', async(req, res) => {
    res.render("./cars/new.ejs")
});
//THE CREATE ROUTE: POST (3rd route)
app.post("/cars", async (req, res) => {
    if (req.body.isUsed === "on") { //Checkbox == "on" was throwing a CastError. Had to switch to true. Why?
        req.body.isUsed = true;
    } else {
        req.body.isUsed = false;
    }
    await Car.create(req.body);
    res.redirect("/cars");
});



//SHOW ROUTE (GET. Details of Specific item by id) (5th route) (This will be our R in CRUD)

app.get("/cars/:carId", async (req, res) => {
    const thisCar = await Car.findById(req.params.carId);
    res.render('cars/show.ejs', {cars: thisCar});
});



//DELETE ROUTE (DELETE (tricked POST). 6th route.) (D in our CRUD)
app.delete("/cars/:carId" , async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
});


//EDIT ROUTE (Part 1 of Update. GET Route. Edit Form) 7th route. (U in CRUD).
app.get("/cars/:carId/edit" , async (req, res) => {
    const thisCar = await Car.findById(req.params.carId);
    res.render("cars/edit.ejs", {cars: thisCar});
});


//UPDATE ROUTE (Part 2 of UPDATE. PUT) 8th Route
app.put("/cars/:carId", async (req, res) => {
 if (req.body.isUsed === "on") {
    req.body.isUsed = true;
 } else {
    req.body.isUsed = false;
 } await Car.findByIdAndUpdate(req.params.carId, req.body);
 res.redirect(`/cars/${req.params.carId}`);
});







//Server Listener:
app.listen(PORT, () => {
    console.log("Server is Listening on port 3000")
});