const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: String,
    isUsed: Boolean,
    year: Number,
    color: String,
    description: String,
}) //Is there a way to add an image? Feel like that would make it take a ton of space quickly in MONGO

const Car = mongoose.model('Car', carSchema);

module.exports = Car; 