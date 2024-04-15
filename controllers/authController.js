const User = require('../models/UserSchema.js');
const JWT = require("jsonwebtoken");
const Admin = require("../models/AdminSchema.js")

const login = async (req,res) => {

    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email }); 
    //   console.log("doc   - ",user);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // console.log(user.password,"-------------------------------------------------");
      // console.log("JWT:--> ",user.getJWTtoken());
      const isPasswordMatched = await user.comparePassword(password)
      if(isPasswordMatched){
        return res.status(200).json({ message: 'Login successful', redirect: '/home',user_id: user._id, JWTtoken:user.getJWTtoken() });
      }else{
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      // console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
}

const adminLogin = async (req,res) => {

  const { email, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ email }); 
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordMatched = await admin.comparePassword(password)
    if(isPasswordMatched){
      return res.status(200).json({ message: 'Login successful', redirect: '/admin',user_id: admin._id, JWTtoken:admin.getJWTtoken() });
    }else{
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const signUp = async (req,res) => {
    const { name, password, email } = req.body;
    // console.log('Received data:', { name, password, email }); // Log received data
    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ name, password, email });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // console.error('Registration error-------->:', error);
        return res.status(500).json({ error});
    }
}

const adminSignUp = async (req,res) => {
  const { name, password, email, hotel, address } = req.body;
  // console.log('Received data:', { name, password, email }); // Log received data
  try {
      // Check if the user already exists in the database
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
      }

      // Create a new user
      const newAdmin = new Admin({ name, password, email, hotel, address });
      await newAdmin.save();

      return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
      // console.error('Registration error-------->:', error);
      return res.status(500).json({ error});
  }
}

const getUsers = async (req,res) => {
    try {
    // Fetch all user details from the database
    const userDetails = await User.find({}, { password: 0 }); // Exclude password field from the response
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const getUserDetailsFromToken = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
      const decoded = JWT.verify(token.split(' ')[1], 'ANNA'); 

      const { _id, email } = decoded;

      const user = await User.findById(_id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ _id, email });
  } catch (error) {
      // console.error(error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const getAdminDetailsFromToken = async (req,res) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // console.log("Anna");
      const decoded = JWT.verify(token.split(' ')[1], 'ADMIN'); 
      console.log(decoded);
      // console.log("Anna2");
      const { _id, email,hotel,address } = decoded;
      // console.log("Anna3");
      const user = await Admin.findById(_id);
      // console.log("Anna4");
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      // console.log("Anna5");
      return res.status(200).json({ _id, email,hotel,address });
  } catch (error) {
      // console.error(error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { login, signUp, getUsers, getUserDetailsFromToken, adminSignUp, adminLogin, getAdminDetailsFromToken };
