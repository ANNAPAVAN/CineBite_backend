const express = require('express');
const router = express.Router(); 

const { login, signUp, getUsers } = require("../controllers/authController.js");
const { getFood, postFood, deleteFoodItem } = require("../controllers/foodController.js")
const {getMovie, postMovie, deleteMovie} = require("../controllers/movieController.js")


router.post("/login", login);
router.post("/register", signUp)
router.get("/getfood",getFood)
router.get("/getmovie",getMovie)
router.post("/postfood",postFood)
router.post("/postmovie",postMovie)
router.delete("/deletefood/:id",deleteFoodItem)
router.delete("/deletemovie/:id",deleteMovie)
router.get("/getusers",getUsers);

module.exports = router;
