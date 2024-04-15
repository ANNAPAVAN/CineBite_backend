const mongoose = require('mongoose');

const movieSchema =  new mongoose.Schema({
    image: String,
    price: Number,
    theatre: String,
    movie:String,
    area: String,
    showtime: String,
  });
  
  module.exports = mongoose.model("movie", movieSchema);