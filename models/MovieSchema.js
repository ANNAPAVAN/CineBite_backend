const mongoose = require('mongoose');

const movieSchema =  new mongoose.Schema({
    image: String,
    price: Number,
    theatre: String,
    count: {
      type: Number,
      default: 0, 
    },
  });
  
  module.exports = mongoose.model("movie", movieSchema);