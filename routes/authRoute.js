const express = require('express');
const router = express.Router();  

const { login, signUp, getUsers, getUserDetailsFromToken ,adminSignUp, adminLogin, getAdminDetailsFromToken, movieAdminSignUp, MovieAdminLogin} = require("../controllers/authController.js");
const { getFood, postFood, deleteFoodItem, updateFood, addFoodCart,getCartFood,removeFromFoodCart, getCartFoodCount, orderFood, getFoodOrders, getUserOrders, updateMobileNumber, orderReceivedDelete, hotelFoodByID ,getHotelOrders, getOrdersCount} = require("../controllers/foodController.js")
const { getMovie, postMovie, deleteMovie} = require("../controllers/movieController.js")

router.post("/login", login);
router.post("/adminlogin",adminLogin)
router.post("/movieadminlogin",MovieAdminLogin)
router.post("/register", signUp)
router.post("/adminregister",adminSignUp);
router.post("/movieadminregister",movieAdminSignUp);

router.get("/getfood",getFood)
router.get("/getmovie",getMovie)
router.post("/postfood",postFood)
router.post("/postmovie",postMovie)
router.delete("/deletefood/:id",deleteFoodItem)
router.delete("/deletemovie/:id",deleteMovie)
router.get("/getusers",getUsers);

router.put("/updatefood/:id", updateFood)

router.post("/addtofoodcart",addFoodCart)
router.get("/getfoodcart/:id",getCartFood)
router.delete('/removefromfoodcart/:id', removeFromFoodCart)

router.get("/getfoodcartcount/:id",getCartFoodCount)

router.get("/getToken", getUserDetailsFromToken)
// router.get("/getToken2", getUserDetailsFromToken)
router.get('/getAdminToken',getAdminDetailsFromToken)

router.post("/foodorder",orderFood); 
router.get("/getfoodorders",getFoodOrders);
router.get("/getuserorders/:id",getUserOrders);
router.put("/updatenumber/:id",updateMobileNumber)
router.delete("/order_received_delete/:id",orderReceivedDelete);


router.get("/gethotelfood/:id",hotelFoodByID);

router.get("/gethotelorders",getHotelOrders)
router.get("/getorderscount",getOrdersCount)

module.exports = router;
