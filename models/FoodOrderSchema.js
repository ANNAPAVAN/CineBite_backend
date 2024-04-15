const mongoose = require('mongoose');

const FoodOrderSchema = new mongoose.Schema({
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
    },
    mobile: {
        type: String,
        default: '0000000000'
    },
    usermobile: {
        type: String,
        default: '0000000000'
    }
});
module.exports = mongoose.model("foodOrder", FoodOrderSchema);
