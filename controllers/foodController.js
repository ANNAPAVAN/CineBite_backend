const Food = require("../models/FoodSchema");

const getFood = async (_req,res) => {
    Food.find()
    .then((docs)=> { res.json(docs)})
    .catch((err) => res.status(400).json("Error: "
    + err));
}

const postFood = async  (req,res) =>{
    const newFood = new Food({
        image : req.body.image,
        price: req.body.price,
        hotel: req.body.hotel,
    });
    newFood.save()
        .then((doc) => {
        res.json({ message: 'Food Posted successfully' });
        console.log(doc)
        })
        .catch((err) => {
        res.json({ message: 'Food Not Posted' });
        console.log(err)})
}

const deleteFoodItem = async(req,res) => {
    const id = req.params.id;
    try {
        await Food.findByIdAndDelete(id);
        console.log("Food item deleted successfully");
        res.json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.log("Internal Server Error");
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getFood ,postFood, deleteFoodItem };