const bcrypt = require("bcryptjs");

const mongoose = require('mongoose');


// Mongoose Schema and Model (User)
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Name is required"],
      maxLength:[50,"Name must be < 50 chars"]
    },
    password: {
      type:String,
      required:[true,"Password is required"],
      minLength:[8,"Password has atleast 8 chars"],
    //   select:false
    },
    email: {
      type:String,
      reqired: [true,'Email is required']
    },
  },{timestamps:true});



  userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the salt value 
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods = {
    // compare password 
    
    comparePassword: async function(enteredPassword){
        // console.log("hi how",this.password);
        return await bcrypt.compare(enteredPassword, this.password)
    }

}

  
module.exports = mongoose.model("mynew", userSchema);