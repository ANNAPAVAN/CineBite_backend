const FoodCart = require("../models/FoodCartSchema");
const Food = require("../models/FoodSchema");
const FoodOrder = require("../models/FoodOrderSchema")
const JWT = require("jsonwebtoken");

const getFood = async (_req,res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching food items', message: error.message });
    } 
} 

const hotelFoodByID = async (req,res) => {
    const oid = req.params.id;
    try{
        const foods = await Food.find({ownerid:oid})
        res.json(foods);
    }catch(error){
        res.status(400).json({ error: 'Error fetching food items', message: error.message });
    }
}

const postFood = async (req,res) => {
    const {ownerid, name, image, price, hotel, address } = req.body;
    try {
        const newFood = new Food({ ownerid, name, image, price, hotel, address });
        await newFood.save();
        res.json({ message: 'Food Posted successfully', food: newFood });
    } catch (error) {
        res.status(400).json({ error: 'Food Not Posted', message: error.message });
    }
}

const deleteFoodItem = async(req,res) => {
    const id = req.params.id;
    try {
        await Food.findByIdAndDelete(id);
        await FoodCart.deleteMany({item_id: id});
        // console.log("Food item deleted successfully");
        res.json({ message: 'Food item deleted successfully' });
    } catch (error) {
        // console.log("Internal Server Error");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateFood = async (req, res) => {
    const id = req.params.id;
    const { price } = req.body;
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, { price }, { new: true });
        
        if (!updatedFood) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        await FoodCart.updateMany({ item_id: id }, { price });

        res.json({ message: 'Food item updated successfully', food: updatedFood });
    } catch (error) {
        // console.log("Internal Server Error");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addFoodCart = async (req,res) => {
    const { user_id, item_id, name, image, price, hotel, address  } = req.body;
    try {
        const addFoodCart = new FoodCart({user_id, item_id, name, image, price, hotel, address });
        await addFoodCart.save();
        res.json({ message: 'Food Added successfully', food: addFoodCart });
    } catch (error) {
        res.status(400).json({ error: 'Food Not Added', message: error.message });
    }
}

const getCartFood = async (req, res) => {
    const userId = req.params.id; 

    try {
        const cartItems = await FoodCart.find({ user_id: userId });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const removeFromFoodCart = async (req,res) => {
    const id = req.params.id;
    try {
        await FoodCart.findByIdAndDelete(id);
        // console.log("Food item deleted successfully");
        res.json({ message: 'Food item deleted successfully' });
    } catch (error) {
        // console.log("Internal Server Error");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getCartFoodCount = async (req, res) => {
    const userId = req.params.id; 

    try {
        const cartItemCount = await FoodCart.countDocuments({ user_id: userId });
        // console.log("cart count db --> ",cartItemCount);
        res.json({ count: cartItemCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const orderFood = async (req,res) => {
    // console.log("orderrrrrrrrrrrr-----------------")
    const { user_id, item_id, name, image, price, hotel, address ,usermobile } = req.body;
    // console.log("req-body  ",req.body);
    try {
        // console.log("orderrrrrrrrrrrr-----------------11111111")
        const addFoodOrder = new FoodOrder({user_id, item_id, name, image, price, hotel, address ,usermobile});
        // console.log("orderrrrrrrrrrrr-----------------saveee")
        await addFoodOrder.save();
        // console.log("orderrrrrrrrrrrr-----------------2222222222")
        res.json({ message: 'Food Ordered successfully', food: addFoodOrder });
    } catch (error) {
        // console.log("orderrrrrrrrrrrr-----------------errrrrrrrrr")
        res.status(400).json({ error: 'Food Not Ordered', message: error.message });
    }

}

const getFoodOrders = async (req,res) => {
    try {
        const orderedfoods = await FoodOrder.find();
        res.json(orderedfoods);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching food items', message: error.message });
    }
}

const getUserOrders = async (req,res) => {
    const userId = req.params.id; 

    try {
        const foodItems = await FoodOrder.find({ user_id: userId });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateMobileNumber = async (req,res) => {
    const itemId = req.params.id;
    const { mobile } = req.body;
    try {
        const updatedNum = await FoodOrder.findByIdAndUpdate(itemId, { mobile }, { new: true });
        
        if (!updatedNum) {
            return res.status(404).json({ error: 'Number not updated' });
        }
        res.json({ message: 'Number updated successfully', item: updatedNum });
    } catch (error) {
        // console.log("Internal Server Error");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const orderReceivedDelete = async (req,res) => {
    const id = req.params.id;
    try {
        await FoodOrder.findByIdAndDelete(id);
        res.json({ message: 'Food item deleted after successfully delivered'  });
    } catch (error) {
        // console.log("Internal Server Error");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getHotelOrders = async (req, res) => {
    const token = req.headers.authorization;
    // console.log("hotel token ", token);

    try {
        // console.log("Data received");
        const decoded = JWT.verify(token, 'ADMIN'); 
        const { hotel } = decoded;
        // console.log("hotel name", hotel);

        const foodItems = await FoodOrder.find({ hotel });
        res.status(200).json(foodItems);
    } catch (error) {
        // console.error("Error:", error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

const getOrdersCount = async (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = JWT.verify(token, 'ADMIN'); 
        const { hotel } = decoded;

        const ordersCount = await FoodOrder.countDocuments({ hotel});
        res.json({ count: ordersCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { getFood, postFood, deleteFoodItem, updateFood, addFoodCart, getCartFood, removeFromFoodCart, getCartFoodCount, orderFood, getFoodOrders, getUserOrders, updateMobileNumber, orderReceivedDelete, hotelFoodByID, getHotelOrders, getOrdersCount };
