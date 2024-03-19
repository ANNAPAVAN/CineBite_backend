const mongoose = require('mongoose');

const foodSchema =  new mongoose.Schema({
    image: String,
    price: String,
    hotel: String,
  });
  

module.exports = mongoose.model("food", foodSchema);