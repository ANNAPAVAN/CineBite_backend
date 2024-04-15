const mongoose = require('mongoose');

const foodSchema =  new mongoose.Schema({
    ownerid: String,
    name: { type: String, required: true },
    image: String,
    price: String,
    hotel: String,
    address: String,
  });
  

module.exports = mongoose.model("food", foodSchema);