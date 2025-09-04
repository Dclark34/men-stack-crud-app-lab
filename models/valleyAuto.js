const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: String,
    isUsed: Boolean,
    year: String,
    color: String,
    description: String,
})

const Car = mongoose.model('Car', carSchema);

module.export = Car;