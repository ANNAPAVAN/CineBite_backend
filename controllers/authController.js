const User = require('../models/UserSchema.js');

const login = async (req,res) => {

  // console.log("dddddddddddddddddddddddddddddddddddd")
    const { name, password } = req.body;
    
    try {
      const user = await User.findOne({ name });
    //   console.log("doc   - ",user);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // console.log(user.password,"-------------------------------------------------");
      const isPasswordMatched = await user.comparePassword(password)
      if(isPasswordMatched){
        return res.status(200).json({ message: 'Login successful', redirect: '/home' });
      }else{
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      // console.error('Login error:', error);
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

module.exports = { login ,signUp, getUsers};