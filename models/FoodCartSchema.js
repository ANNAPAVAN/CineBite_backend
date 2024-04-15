// models/CartSchema.js
const mongoose = require('mongoose');

const FoodCartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    hotel: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("foodCart", FoodCartSchema);
