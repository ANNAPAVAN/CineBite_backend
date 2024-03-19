const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const routes = require("./routes/index.js")

// Middleware for parsing JSON
app.use(express.json());

app.use(cors());

// MongoDB connection
(async () => {
  try {
    await mongoose.connect('mongodb+srv://pavananna:Mongodb134@new.bes8xs6.mongodb.net/ap', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();


app.use("/api",routes);

//  Start the Server 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// // Register Route
// app.post('/register', async (req, res) => {
//   const { name, password, email } = req.body;
//   // console.log('Received data:', { name, password, email }); // Log received data
//   try {
//     // Check if the user already exists in the database
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create a new user
//     const newUser = new User({ name, password, email });
//     await newUser.save();

//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     // console.error('Registration error-------->:', error);
//     return res.status(500).json({ error});
//   }
// });

// -----------------------


// // Login Route 
// app.post('/login', async (req, res) => {
//   const { name, password } = req.body;
  
//   try {
//     const user = await User.findOne({ name });
//     console.log("doc   - ",user);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     // console.log(user.password,"-------------------------------------------------");
//     const isPasswordMatched = await user.comparePassword(password)
//     if(isPasswordMatched){
//       return res.status(200).json({ message: 'Login successful', redirect: '/home' });
//     }else{
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     // console.error('Login error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });


// -----------------------

// app.get("/getfood",(_req,res) => {
//   Food.find()
//   .then((docs)=> { res.json(docs)})
//   .catch((err) => res.status(400).json("Error: "
//   + err));
// })

// --------------------------


// app.get("/getmovie",(req,res) => {
//   Movie.find()
//   .then((docs)=> { res.json(docs)})
//   .catch((err) => res.status(400).json("Error: "
//   + err));
// })

// -----------------------------

// app.post("/postfood",(req,res) => {
//   const newFood = new Food({
//     image : req.body.image,
//     price: req.body.price,
//     hotel: req.body.hotel,
//   });
//   newFood.save()
//     .then((doc) => {
//       res.json({ message: 'Food Posted successfully' });
//       console.log(doc)
//     })
//     .catch((err) => {
//       res.json({ message: 'Food Not Posted' });
//       console.log(err)})
// })

// ------------------------------


// app.post("/postmovie",(req,res) => {
//   const newMovie = new Movie({
//     image : req.body.image,
//     price: req.body.price,
//     theatre: req.body.theatre,
//   });
//   newMovie.save()
//     .then((doc) => {
//       res.json({ message: 'Movie Posted successfully' });
//       console.log(doc)
//     })
//     .catch((err) => {
//       res.json({ message: 'Movie not POsted' });
//       console.log(err)})
// })

// -------------------------------

// app.delete('/deletefood/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     await Food.findByIdAndDelete(id);
//     console.log("Food item deleted successfully");
//     res.json({ message: 'Food item deleted successfully' });
//   } catch (error) {
//     console.log("Internal Server Error");
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// ------------------------------


// app.delete('/deletemovie/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     await Movie.findByIdAndDelete(id);
//     console.log("Movie item deleted successfully");
//     res.json({ message: 'Movie item deleted successfully' });
//   } catch (error) {
//     console.log("Internal Server Error");
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// ------------------------------------

// app.get('/getusers', async (req, res) => {
//   try {
//     // Fetch all user details from the database
//     const userDetails = await User.find({}, { password: 0 }); // Exclude password field from the response
//     res.json(userDetails);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// ----------------------------------










